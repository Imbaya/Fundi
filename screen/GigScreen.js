import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, TextInput, ImageBackground,Image, Modal } from 'react-native';
import Card from '../components/card';
import { Dimensions, Linking } from 'react-native';
import TitleText from '../components/TitleText';
import * as Location from 'expo-location';
import { db,auth } from '../Database/config';
import { dbc } from '../Database/clientSide';
import { fonts } from '../components/fonts';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import getDistance from 'geolib/es/getPreciseDistance';
import MapView, { Marker } from 'react-native-maps';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs,doc, updateDoc, getDoc, setDoc,GeoPoint  } from 'firebase/firestore';

const GigScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [allgigs, setAllgigs] = useState([]);
    const [location, setLocation] = useState({});
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [amount, setAmount] = useState(0);
    const [buyerLatitude, setBuyerLatitude] = useState(0);
    const [buyerLongitude, setBuyerLongitude] = useState(0);
    const [distance, setDistance] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [timeinminutes, setTimeInMinutes] = useState(0);
    const [couriercharges, setCourierCharges] = useState(0);
    const [totalmoney, setTotalMoney] = useState(0);
    const [pendingGigs, setPendingGigs] = useState([]);
    const [activeGigs, setActiveGigs] = useState([]);
    const [AgentFirstName, setAgentFirstName] = useState("");
    const [AgentLastName, setAgentLastName] = useState("");
    const [AgentPhoneNumber, setAgentPhoneNumber] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [profession, setAgentProfession] =  useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (!user) {
                navigation.replace("LoginScreen")
            }
        })

        return unsubscribe
    }, [])


    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
          }
    
          Location.watchPositionAsync(
            {
              accuracy: Location.Accuracy.High,
              distanceInterval: 1,
              timeInterval: 10000,
            },
            async (location) => {
              const { latitude, longitude } = location.coords;
              await updateLocation(latitude, longitude);
            }
          );
        })();
      }, []);

     
const updateLocation = async (latitude, longitude) => {
    // Replace 'agentId' with the actual agent's ID
    const docRef = doc(db, 'Location', auth.currentUser.uid);

    try {
        await setDoc(docRef, {
          location: new GeoPoint(latitude, longitude),
        }, { merge: true });
      } catch (error) {
        console.error("Error updating document: ", error);
      }
      
  };
    

    const openDialer = (phoneNumber) => {
        const formattedPhoneNumber = phoneNumber.replace(/\s+/g, ''); // Remove spaces from the phone number
        const dialableNumber = `tel:${formattedPhoneNumber}`;
        
        Linking.openURL(dialableNumber)
          .catch((err) => console.error('An error occurred when trying to open the dialer', err));
      };
      

        //Import all the gigs from firebase
       
const getNewOrders = async () => {
    setRefreshing(true);
  
    const allgigs = [];
    const q = query(collection(dbc, "FundiIssues"), where("status", "==", "New Gig"), where("selected", "==", profession));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      allgigs.push({ id: doc.id, ...doc.data() });
      console.log(doc.id, " => ", doc.data());
      const lat = doc.data().location.latitude;
      const long = doc.data().location.longitude;
      const amount = doc.data().amount;
      setBuyerLatitude(lat);
      setBuyerLongitude(long); 
      setAmount(amount);
    });
    setAllgigs([...allgigs]);
    setRefreshing(false);
  }
  
  const getPendingOrders = async () => {
    setRefreshing(true);
    const pendinggigs = [];
    const q = query(collection(dbc, "FundiIssues"), where("status", "==", "Pending Delivery"), where("agentId", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      pendinggigs.push({ id: doc.id, ...doc.data() });
      console.log(doc.id, " => ", doc.data());
      const lat = doc.data().Latitude;
      const long = doc.data().Longitude;
      const amount = doc.data().Budget;
      setBuyerLatitude(lat);
      setBuyerLongitude(long); 
      setAmount(amount);
    });
    setPendingGigs([...pendinggigs]);
    setRefreshing(false);
  }
  
  const getActiveOrders = async () => {
    setRefreshing(true);
    const activegigs = [];
    const q = query(collection(dbc, "FundiIssues"), where("status", "==", "Active"), where("agentId", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      activegigs.push({ id: doc.id, ...doc.data() });
      console.log(doc.id, " => ", doc.data());
      const lat = doc.data().Latitude;
      const long = doc.data().Longitude;
      const amount = doc.data().Budget;
      setBuyerLatitude(lat);
      setBuyerLongitude(long); 
      setAmount(amount);
    });
    setActiveGigs([...activegigs]);
    setRefreshing(false);
  }
  

        useEffect(() => {
         getLocation();

        }, [])
        

        
        const [showMap, setShowMap] = useState(false);
        const renderOrders = ({item}) => {
            const distance = getDistance(
                latitude,
                longitude,
                item.Latitude,
                item.Longitude
            );
            //claculate the courier charge price depending on distance
            const courierCharges = distance * 20
        
            const averageSpeed = 80; // km/hour
        
            const timeInMinutes = (distance / averageSpeed )*60;
        
            const totalMoney = courierCharges + item.Budget
        
            //Accepting an order
             const handleUpdate = async (id) => {
                const docRef = doc(dbc, 'FundiIssues', id);
                await updateDoc(docRef, {
                  status: "Pending Delivery",
                  agentId: auth.currentUser.uid,
                  agentLatitude: latitude,
                  agentLongitude: longitude,
                  totalMoney,
                  timeInMinutes,
                  courierCharges,
                  distance,
                  AgentFirstName:AgentFirstName,
                  AgentLastName:AgentLastName,
                  AgentPhoneNumber:AgentPhoneNumber
                });
                setDistance(distance);
                setTimeInMinutes(timeInMinutes);
                setCourierCharges(courierCharges);
                setTotalMoney(totalMoney);
                // setIsAccepted(id);
                getNewOrders();
                getPendingOrders();
              };
            const clientLocation = {
                latitude: item.location.latitude,
                longitude: item.location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              };
        
              const handleViewLocation = () => {
                setShowMap(!showMap);
              };
                return (
                    <View style={styles.gigs}>

                    <Card style={styles.prodCard}>
                    
                       
                    
                        <View style={styles.orderDetails}>
                          
                          
                    
                            <Card style={styles.additionsView}>
                                
                            
                            <View style={styles.descriptionView}>   
                                        <View style={styles.cartprodImage}>
                                        <Image
                                          //  source={{ uri: imgUrl }}
                                            style={styles.bannerimage}
                                        // resizeMode="cover" 
                                        />
                                    </View>
                    <View style={styles.description}>
                    
                                        <View style={styles.textView}>
                    
                                        <Text allowFontScaling={false} style={fonts.blackBoldMedium}> {item.clientName}</Text>
                                        
                                        <TouchableOpacity  onPress={() => setModalVisible(true)}>
                                        <Text allowFontScaling={false} style={fonts.blackBoldMedium}>See Attachment</Text>
                                        </TouchableOpacity>
                    
                                        </View>
                                        <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={modalVisible}
                                            onRequestClose={() => setModalVisible(false)}
                                            >
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image
                                                source={{ uri: item.imageUrl }} // Replace 'imgUrl' with the actual URL or path of the image
                                                style={{ width: '100%', height: '90%' }} // Adjust the dimensions as needed
                                                resizeMode="contain" // Adjust the resizeMode as needed
                                                />
                                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                                <Text style={{  fontSize: 26, color: 'white' }}>Close</Text>
                                                </TouchableOpacity>
                                            </View>
                                            </Modal>

                    
                                       
                                        
                                        <View style={styles.textView}>
                    
                    
                    
                    
                                            <View style={styles.textView2}>
                                            <TouchableOpacity onPress={() => openDialer(item.clientNumber)}>
                                                <Text allowFontScaling={false} style={fonts.blackBoldSmall}>
                                                {item.clientNumber}
                                                </Text>
                                            </TouchableOpacity>
                                            </View>
                    
                                            <View style={styles.textView2}>
                    
                                                {/* <Text  style={styles.text42}>Quantity</Text>*/}
                                            </View>
                    
                                            
                                            
                    
                                        </View>
                                       
                    
                    
                                      
                                        <View style={styles.textView}>
                    
                    
                                            <View style={styles.textView2}>
                                               
                                                <Text allowFontScaling={false} style={fonts.greyLightSmall}>Labour Charge</Text>
                    
                                            </View>
                    
                                            
                    
                                           
                    
                                            <View style={styles.textView2}>
                                               
                                            <Text allowFontScaling={false} style={fonts.greyLightSmall}>{item.amount} </Text>
                    
                                           </View>
                    
                                            
                                        </View>
                    
                                        <View style={styles.textView}>
                    
                    
                    <View style={styles.textView2}>
                       
                        <Text allowFontScaling={false} style={fonts.greyLightSmall}>Transport Charge</Text>
                    
                    </View>
                    
                    
                    
                    
                    
                    <View style={styles.textView2}>
                       
                    <Text allowFontScaling={false} style={fonts.greyLightSmall}>{courierCharges} </Text>
                    
                    </View>
                    
                    
                    </View>
                    
                    
                    
                                        </View>
                                        </View>
                    
                    
                    
                    
                    
                                        
                                
                    
                            </Card>
                    
                            <View style={styles.textView}>
                                <View style={styles.textView2}>
                                   
                                </View>
                    
                                <View style={styles.textView2}>
                                   
                                    <Text  style={fonts.greeBoldSmall}>Ksh {item.amount}</Text>
                                </View>
                            </View>
                    
                    
                            <View style={styles.textView}>
                                <TouchableOpacity onPress={handleViewLocation}>
                                <View style={styles.textView2}>
                                    <MaterialIcons name="location-pin" size={24} color="black" />
                                    <Text style={fonts.greyLightBig}> View location </Text>
                                </View>
                    
                                </TouchableOpacity>
                               
                               
                            </View>
                    
                            {showMap && (
                                    <MapView
                                    style={{ width: '100%', height: 200 }}
                                    region={clientLocation}
                                    >
                                    <Marker coordinate={clientLocation} title="Client Location" />
                                    </MapView>
                                )}
                            
                    
                           
                    
                    
                            <View style={styles.textView}>
                    
                    
                                <View style={styles.customerDet}>
                                    
                    
                                    <View style={styles.nameDetail}>
                                        <Text  style={fonts.blackBoldMedium}>Request</Text>
                    
                                        <TouchableOpacity>
                                        
                                            <Text style={fonts.blackBoldMedium}>{item.selected}</Text>
                                       
                                        </TouchableOpacity>
                                    </View>
                                </View>
                    
                    
                                
                            </View>
                    
                            <View style={styles.textView}>
                    
                    
                    
                    
                    
                    
                    </View>
                    
                    
                    <View style={styles.customerDet}>
                        
                    
                        <View style={styles.nameDetail}>
                            <Text  style={fonts.blackBoldMedium}>Remarks</Text>
                    
                           
                            
                                
                           
                            
                        </View>
                    
                       
                    </View>
                    <Text style={fonts.blackLightSmall}>{item.description}</Text>
                          
                    
                    
                    
                            <View style={styles.buttonView}>
                    
                                <Card style={styles.declineButton}>
                                <TouchableOpacity >
                                    <Text style={fonts.blackBoldMedium}>
                                    Decline
                                    </Text>
                                    </TouchableOpacity>
                                </Card>
                             
                                
                                <Card style={styles.acceptButton}>
                                <TouchableOpacity onPress={() => handleUpdate(item.id)} >
                                    <Text style={fonts.blackBoldMedium}>
                                    Accept
                                    </Text>
                                    </TouchableOpacity>
                                </Card>
                                
                                
                    
                            </View>
                    
                    
                    
                    
                        </View>
                    
                    
                    
                    
                    
                    </Card>
                    
                    
                    
                    
                    
                    
                    </View>
    
            )};

            const renderPendingOrders = ({item}) => {
                const clientLocation = {
                    latitude: item.location.latitude,
                    longitude: item.location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  };
            
                  const handleViewLocation = () => {
                    setShowMap(!showMap);
                  };
               
                    return (
                        <View style={styles.gigs}>
    
                        <Card style={styles.prodCard}>
                        
                           
                        
                            <View style={styles.orderDetails}>
                              
                              
                        
                                <Card style={styles.additionsView}>
                                    
                                
                                <View style={styles.descriptionView}>   
                                            <View style={styles.cartprodImage}>
                                            <Image
                                              //  source={{ uri: imgUrl }}
                                                style={styles.bannerimage}
                                            // resizeMode="cover" 
                                            />
                                        </View>
                        <View style={styles.description}>
                        
                                            <View style={styles.textView}>
                        
                                            <Text allowFontScaling={false} style={fonts.blackBoldMedium}> {item.clientName}</Text>
                                            
                                            <TouchableOpacity  onPress={() => setModalVisible(true)}>
                                            <Text allowFontScaling={false} style={fonts.blackBoldMedium}>See Attachment</Text>
                                            </TouchableOpacity>
                        
                                            </View>
                                            <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={modalVisible}
                                            onRequestClose={() => setModalVisible(false)}
                                            >
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image
                                                source={{ uri: item.imageUrl }} // Replace 'imgUrl' with the actual URL or path of the image
                                                style={{ width: '100%', height: '90%' }} // Adjust the dimensions as needed
                                                resizeMode="contain" // Adjust the resizeMode as needed
                                                />
                                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                                <Text style={{  fontSize: 26, color: 'white' }}>Close</Text>
                                                </TouchableOpacity>
                                            </View>
                                            </Modal>
                        
                                           
                                            
                                            <View style={styles.textView}>
                        
                        
                        
                        
                                                <View style={styles.textView2}>
                                               
                                                <TouchableOpacity onPress={() => openDialer(item.clientNumber)}>
                                                <Text allowFontScaling={false} style={fonts.blackBoldSmall}>
                                                {item.clientNumber}
                                                </Text>
                                                 </TouchableOpacity>

                                                </View>
                        
                                                <View style={styles.textView2}>
                        
                                                    {/* <Text  style={styles.text42}>Quantity</Text>*/}
                                                </View>
                        
                                                
                                                
                        
                                            </View>
                                           
                        
                        
                                          
                                            <View style={styles.textView}>
                        
                        
                                                <View style={styles.textView2}>
                                                   
                                                    <Text allowFontScaling={false} style={fonts.greyLightSmall}>Labour Charge</Text>
                        
                                                </View>
                        
                                                
                        
                                               
                        
                                                <View style={styles.textView2}>
                                                   
                                                <Text allowFontScaling={false} style={fonts.greyLightSmall}>{item.amount} </Text>
                        
                                               </View>
                        
                                                
                                            </View>
                        
                                            <View style={styles.textView}>
                        
                        
                        <View style={styles.textView2}>
                           
                            <Text allowFontScaling={false} style={fonts.greyLightSmall}>Transport Charge</Text>
                        
                        </View>
                        
                        
                        
                        
                        
                        <View style={styles.textView2}>
                           
                        <Text allowFontScaling={false} style={fonts.greyLightSmall}>n/a </Text>
                        
                        </View>
                        
                        
                        </View>
                        
                        
                        
                                            </View>
                                            </View>
                        
                        
                        
                        
                        
                                            
                                    
                        
                                </Card>
                        
                                <View style={styles.textView}>
                                    <View style={styles.textView2}>
                                       
                                    </View>
                        
                                    <View style={styles.textView2}>
                                       
                                        <Text  style={fonts.greeBoldSmall}>Ksh {item.amount}</Text>
                                    </View>
                                </View>
                        
                        
                                <View style={styles.textView}>
                                    <TouchableOpacity  onPress={handleViewLocation}>
                                    <View style={styles.textView2}>
                                        <MaterialIcons name="location-pin" size={24} color="black" />
                                        <Text style={fonts.greyLightBig}> View Location</Text>
                                    </View>
                        
                                    </TouchableOpacity>
                                   
                                </View>
                                {showMap && (
                                    <MapView
                                    style={{ width: '100%', height: 200 }}
                                    region={clientLocation}
                                    >
                                    <Marker coordinate={clientLocation} title="Client Location" />
                                    </MapView>
                                )}
                        
                                
                                
                        
                               
                        
                        
                                <View style={styles.textView}>
                        
                        
                                    <View style={styles.customerDet}>
                                        
                        
                                        <View style={styles.nameDetail}>
                                            <Text  style={fonts.blackBoldMedium}>Request</Text>
                        
                                            <TouchableOpacity>
                                            
                                                <Text style={fonts.blackBoldMedium}>{item.selected}</Text>
                                           
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                        
                        
                                    
                                </View>
                        
                                <View style={styles.textView}>
                        
                        
                        
                        
                        
                        
                        </View>
                        
                        
                        <View style={styles.customerDet}>
                            
                        
                            <View style={styles.nameDetail}>
                                <Text  style={fonts.blackBoldMedium}>Remarks</Text>
                        
                               
                                
                                    
                               
                                
                            </View>
                        
                           
                        </View>
                        <Text style={fonts.blackLightSmall}>{item.description}</Text>
                              
                        
                        
                        
                                <View style={styles.buttonView}>
                        
                                <Card style={styles.pendingButton}>
                                <Text allowFontScaling={false} style={styles.text2b}>
                                    Wait for confirmation ...
                                </Text>
                            </Card>
                                    
                                    
                        
                                </View>
                        
                        
                        
                        
                            </View>
                        
                        
                        
                        
                        
                        </Card>
                        
                        
                        
                        
                        
                        
                        </View>
        
                )};

                const renderActiveOrders = ({item}) => {
                    //Accepting an order
                    
                    const handleArrivedButtonClick = async () => {
                        try {
                            // Reference to the Firestore collection and the specific document
                            const orderDocument = doc(dbc, 'FundiIssues', item.id); // Assuming item.id is the document ID

                            // Update the "status" field to "arrived"
                            await updateDoc(orderDocument, { status: 'Arrived' });

                            console.log('Order status updated to arrived');
                        } catch (error) {
                            console.error('Error updating order status:', error);
                        }
                    };

                      const clientLocation = {
                        latitude: item.location.latitude,
                        longitude: item.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      };
                
                      const handleViewLocation = () => {
                        setShowMap(!showMap);
                      };
               
                    return (
                        <View style={styles.gigs}>
    
                        <Card style={styles.prodCard}>
                        
                           
                        
                            <View style={styles.orderDetails}>
                              
                              
                        
                                <Card style={styles.additionsView}>
                                    
                                
                                <View style={styles.descriptionView}>   
                                            <View style={styles.cartprodImage}>
                                            <Image
                                              //  source={{ uri: imgUrl }}
                                                style={styles.bannerimage}
                                            // resizeMode="cover" 
                                            />
                                        </View>
                        <View style={styles.description}>
                        
                                            <View style={styles.textView}>
                        
                                            <Text allowFontScaling={false} style={fonts.blackBoldMedium}> {item.clientName}</Text>
                                            
                                            <TouchableOpacity  onPress={() => setModalVisible(true)}>
                                            <Text allowFontScaling={false} style={fonts.blackBoldMedium}>See Attachment</Text>
                                            </TouchableOpacity>
                        
                                            </View>
                                            <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={modalVisible}
                                            onRequestClose={() => setModalVisible(false)}
                                            >
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image
                                                source={{ uri: item.imageUrl }} // Replace 'imgUrl' with the actual URL or path of the image
                                                style={{ width: '100%', height: '90%' }} // Adjust the dimensions as needed
                                                resizeMode="contain" // Adjust the resizeMode as needed
                                                />
                                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                                <Text style={{  fontSize: 26, color: 'white' }}>Close</Text>
                                                </TouchableOpacity>
                                            </View>
                                            </Modal>
                        
                                           
                                            
                                            <View style={styles.textView}>
                        
                        
                        
                        
                                                <View style={styles.textView2}>
                                               
                                                  <TouchableOpacity onPress={() => openDialer(item.clientNumber)}>
                                                    <Text allowFontScaling={false} style={fonts.blackBoldSmall}>
                                                    {item.clientNumber}
                                                    </Text>
                                                    </TouchableOpacity>
                                                </View>
                        
                                                <View style={styles.textView2}>
                        
                                                    {/* <Text  style={styles.text42}>Quantity</Text>*/}
                                                </View>
                        
                                                
                                                
                        
                                            </View>
                                           
                        
                        
                                          
                                            <View style={styles.textView}>
                        
                        
                                                <View style={styles.textView2}>
                                                   
                                                    <Text allowFontScaling={false} style={fonts.greyLightSmall}>Labour Charge</Text>
                        
                                                </View>
                        
                                                
                        
                                               
                        
                                                <View style={styles.textView2}>
                                                   
                                                <Text allowFontScaling={false} style={fonts.greyLightSmall}>{item.amount} </Text>
                        
                                               </View>
                        
                                                
                                            </View>
                        
                                            <View style={styles.textView}>
                        
                        
                        <View style={styles.textView2}>
                           
                            <Text allowFontScaling={false} style={fonts.greyLightSmall}>Transport Charge</Text>
                        
                        </View>
                        
                        
                        
                        
                        
                        <View style={styles.textView2}>
                           
                        <Text allowFontScaling={false} style={fonts.greyLightSmall}>n/a </Text>
                        
                        </View>
                        
                        
                        </View>
                        
                        
                        
                                            </View>
                                            </View>
                        
                        
                        
                        
                        
                                            
                                    
                        
                                </Card>
                        
                                <View style={styles.textView}>
                                    <View style={styles.textView2}>
                                       
                                    </View>
                        
                                    <View style={styles.textView2}>
                                       
                                        <Text  style={fonts.greeBoldSmall}>Ksh {item.amount}</Text>
                                    </View>
                                </View>
                        
                        
                                <View style={styles.textView}>
                                    <TouchableOpacity  onPress={handleViewLocation}>
                                    <View style={styles.textView2}>
                                        <MaterialIcons name="location-pin" size={24} color="black" />
                                        <Text style={fonts.greyLightBig}> View Location</Text>
                                    </View>
                        
                                    </TouchableOpacity>
                                   
                                </View>
                                {showMap && (
                                    <MapView
                                    style={{ width: '100%', height: 200 }}
                                    region={clientLocation}
                                    >
                                    <Marker coordinate={clientLocation} title="Client Location" />
                                    </MapView>
                                )}
                        
                                
                                
                        
                               
                        
                        
                                <View style={styles.textView}>
                        
                        
                                    <View style={styles.customerDet}>
                                        
                        
                                        <View style={styles.nameDetail}>
                                            <Text  style={fonts.blackBoldMedium}>Request</Text>
                        
                                            <TouchableOpacity>
                                            
                                                <Text style={fonts.blackBoldMedium}>{item.selected}</Text>
                                           
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                        
                        
                                    
                                </View>
                        
                                <View style={styles.textView}>
                        
                        
                        
                        
                        
                        
                        </View>
                        
                        
                        <View style={styles.customerDet}>
                            
                        
                            <View style={styles.nameDetail}>
                                <Text  style={fonts.blackBoldMedium}>Remarks</Text>
                        
                               
                                
                                    
                               
                                
                            </View>
                        
                           
                        </View>
                        <Text style={fonts.blackLightSmall}>{item.description}</Text>
                              
                        
                        
                        
                                <View style={styles.buttonView}>
                        
                                <Card style={styles.acceptButton}>
           
                                    <TouchableOpacity onPress={handleArrivedButtonClick} >
                                        <Text allowFontScaling={false} style={styles.text2c}>
                                            Arrived
                                        </Text>
                                    </TouchableOpacity>
                                </Card> 
                                                        
                                    
                        
                                </View>
                        
                        
                        
                        
                            </View>
                        
                        
                        
                        
                        
                        </Card>
                        
                        
                        
                        
                        
                        
                        </View>
        
                )};


    //Get the location of the user
    const getLocation = async () => {
        try {
          const { granted } = await Location.requestBackgroundPermissionsAsync();
          if (!granted) return;
          const {
            coords: { latitude, longitude },
          } = await Location.getCurrentPositionAsync();
          setLatitude(latitude);
          setLongitude(longitude);
          console.log(latitude, longitude)
        } catch (err) {
    
        }
      }
  
      const getUserDetails = async () => {
        const docRef = doc(db, 'FundiAppUsers', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            console.log(docSnap.data());
            const firstname = docSnap.data().firstname;
            const lastname = docSnap.data().lastname;
            const phonenumber = docSnap.data().phonenumber;
            const profession = docSnap.data().profession;
    
            //store the agent data in a variable
            setAgentFirstName(firstname);
            setAgentLastName(lastname);
            setAgentPhoneNumber(phonenumber);
            setAgentProfession(profession);
        } else {
            console.log("No such document!");
        }
    }
    
  
////COMPONENT IMPORTED TO RENDER FLATLIST ITEMS//////





    return (


        <View style={styles.container}>
            <ImageBackground
                resizeMode="cover"
                style={styles.imageBackground}
            >


                <View style={styles.statsView}>

                    <Card style={styles.statsCard}>
                        <TitleText style={fonts.blackBoldBig}>Ksh 0</TitleText>
                        <TitleText style={fonts.blackBoldMedium}>Overall earnings</TitleText>
                    </Card>

                    <Card style={styles.statsCard}>
                        <TitleText style={fonts.blackBoldBig}>0</TitleText>
                        <TitleText style={fonts.blackBoldMedium}>Today's Bookings</TitleText>
                    </Card>


                </View>

               {/*  <ScrollView> */}
               {pendingGigs.length === 0 && activeGigs.length === 0 && (
                    <>
                <TitleText style={fonts.whiteBoldBig}>New Gigs ({allgigs.length})</TitleText>
                <FlatList
                    onRefresh={getNewOrders}
                    data={allgigs}
                    refreshing={refreshing}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderOrders}
                    numColumns={1}
                />
                </>
                )}

                  <TitleText style={fonts.whiteBoldBig}>Pending ({pendingGigs.length})</TitleText>
                  <FlatList
                    onRefresh={getPendingOrders}
                    data={pendingGigs}
                    refreshing={refreshing}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderPendingOrders}
                    numColumns={1}
                />

                 



                <TitleText style={fonts.whiteBoldBig}>Delivery ({activeGigs.length})</TitleText>
                <FlatList
                    onRefresh={getActiveOrders}
                    data={activeGigs}
                    refreshing={refreshing}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderActiveOrders}
                    numColumns={1}
                />


{/*</ScrollView>*/}

            </ImageBackground>


        </View>





    )
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#001B2E',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        //paddingTop: 50
    },

    bannerimage: {
        height: '100%',
        width: '100%'

    },

    orderDetails: {
        padding: 10,
        justifyContent: 'space-between',
        
    },

    title1: {
        fontFamily: 'Lexend-light',
        fontSize: 25,
        paddingLeft: 20,
        color: 'white',
        fontWeight: 'bold'



    },

    title2: {
        fontFamily: 'Lexend-light',
        fontSize: 20,
        //paddingLeft: 20,
        color: 'black',
        fontWeight: 'bold'



    },

    title3: {
        fontFamily: 'Lexend-light',
        fontSize: 17,
        //paddingLeft: 20,
        color: 'black',
      //  fontWeight: 'bold'



    },


  

    gigs: {
        padding: 10,
       height: 'auto',
    },
    text2c: {
        fontFamily: 'Lexend-bold',
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    },
    statsCard: {
        width: 164,
        height: 80,
        shadowColor: 'white',
        padding: 10
    },

    statsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 50
    },
    imageBackground: {
        //  flex: 1,
        //  justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    bold: {
        fontWeight: '400',
        color: 'black',
        fontSize: 25

    },


    prodCard: {
        overflow: 'hidden',
        // padding: 10,
        shadowColor: 'white',
       height: 'auto',
        borderRadius: 15
    },

    prodImage: {
        borderBottomColor: 'black',
        height: '40%',
        backgroundColor: 'blue'
    },

    textView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
     //   paddingHorizontal: 10,
      //  paddingTop:1,

    },

    textView1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 0.2
    },

    textView2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingHorizontal: 20,
        alignItems: 'center'
    },



    additionsView: {
        backgroundColor: '#F5F2F0',
        shadowOpacity: 0.15,
        height: 'auto',
        //justifyContent: 'space-around'
    },

    mapView: {
        height: 180,
        borderRadius: 15,
        
    },



    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        //  paddingTop: 10



    },



    declineButton: {
        //  flex: 1,

        //paddingHorizontal: 20,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 32,
        shadowOpacity: 0.2,

        borderColor: 'red',
        borderWidth: 1
    },

    acceptButton: {
        //  flex: 1,

        //paddingHorizontal: 20,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 32,
        shadowOpacity: 0.2,
        backgroundColor: '#8CC740',
    },

    callButton: {
        //  flex: 1,

        //paddingHorizontal: 20,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 23,
        shadowOpacity: 0.2,
        backgroundColor: '#17304A',
    },

    customerDet: {
        width: Dimensions.get('window').width * 0.38,

    },

    customerDet1: {
        width: Dimensions.get('window').width * 0.30,
        flexDirection: 'row',

    },

    profileImage: {
        backgroundColor: 'black',
        height: 56,
        width: 56,
        borderRadius: 100,
        overflow: 'hidden'
    },

    nameDetail: {
        width: '100%',
        paddingLeft: 10
    },



///ORDERED ITEMS STYLES///////////
    descriptionView: {
        paddingTop: 10,
        paddingBottom:10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        
            },

            cartprodImage: {
                borderBottomColor: 'black',
                height: 60,
                backgroundColor: 'blue',
                width: 60,
                borderRadius: 100,
                overflow: 'hidden'
            },

            description: {
                //  borderTopWidth: 1,
                //  borderBottomWidth: 1,
                //  borderBottomColor: '#8CC740',
                 // borderTopColor: '#8CC740',
                  paddingBottom: 5,
                  paddingTop: 5,
                  width: '77%'
               //   flexDirection: 'row'
              },

            
















});

export default GigScreen;