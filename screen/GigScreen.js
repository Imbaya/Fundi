import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, TextInput, ImageBackground,Image } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import TitleText from '../components/TitleText';
import * as Location from 'expo-location';
import SubText from '../components/SubText';
import { Icon } from 'react-native-elements';
import { db } from '../Database/config';
import { dbc } from '../Database/clientSide';
import { fonts } from '../components/fonts';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';

const GigScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [description, setDescritpion] = useState('');
    const [allgigs, setAllgigs] = useState([]);
    const [location, setLocation] = useState({});
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

        //Import all the gigs from firebase
        const getGigs =async () => {
            setRefreshing(true);
        
            const allgigs = [];
            const querySnapshot = await dbc.collection("Description").get();
            querySnapshot.forEach((doc) => {
                allgigs.push({ id: doc.id, ...doc.data() });
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
            setAllgigs([...allgigs]);
            setRefreshing(false);
            
        } 

  /*  const renderGridItem = itemData => {
        return (
            ////COMPONENT IMPORTED TO RENDER FLATLIST ITEMS//////
            <Gigs
                name={itemData.item.name}

                image={itemData.item.image}
                location={itemData.item.location}
                service={itemData.item.service}
                remarks={itemData.item.remarks}
                onSelect={() => { navigation.replace("QuoteScreen", { state: 0 }) }}


            />
        )
    }*/

    //Get the location of the user
    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Please grant location permissions")
                return;
            }

            let curretLocation = await  Location.getCurrentPositionAsync({});
            setLocation(curretLocation);
            console.log("Location:");
            console.log(curretLocation);
        };
        getPermissions();
        geocode();
        getGigs();

    }, [])

    //Get the Town using Latitude and Longitude
    const geocode = async () => {
        const geocodedAddress = await Location.reverseGeocodeAsync({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
        });
        setAddress(geocodedAddress[0].city);
        console.log('reverseGeocode:');
        console.log(geocodedAddress[0].city);

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

                <ScrollView>

                <TitleText style={fonts.whiteBoldBig}>New Gigs (3)</TitleText>


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

                    <Text allowFontScaling={false} style={fonts.blackBoldMedium}> Alice Achieng</Text>
<View style={styles.textView}>
                    <Icon type="material-community" 
                                                         name = "paperclip"
                                                         color= "#17304A"
                                                         size = {20}
                                                         
                                                          />
                    <Text allowFontScaling={false} style={fonts.blackBoldMedium}>See Attachment</Text>
                    </View>
                    </View>

                   
                    
                    <View style={styles.textView}>




                        

                        <View style={styles.textView2}>

                            {/* <Text  style={styles.text42}>Quantity</Text>*/}
                        </View>

                        
                        

                    </View>
                   


                  
                    <View style={styles.textView}>


                        <View style={styles.textView2}>
                           
                            <Text allowFontScaling={false} style={fonts.greyLightSmall}>Labour Charge</Text>

                        </View>

                        

                       

                        <View style={styles.textView2}>
                           
                        <Text allowFontScaling={false} style={fonts.greyLightSmall}>500 </Text>

                       </View>

                        
                    </View>

                    <View style={styles.textView}>


<View style={styles.textView2}>
   
    <Text allowFontScaling={false} style={fonts.greyLightSmall}>Transport Charge</Text>

</View>





<View style={styles.textView2}>
   
<Text allowFontScaling={false} style={fonts.greyLightSmall}>300 </Text>

</View>


</View>



                    </View>
                    </View>





                    
            

        </Card>

        <View style={styles.textView}>
            <View style={styles.textView2}>
               
            </View>

            <View style={styles.textView2}>
               
                <Text  style={fonts.greeBoldSmall}>Ksh 800</Text>
            </View>
        </View>


        <View style={styles.textView}>
            <TouchableOpacity>
            <View style={styles.textView2}>
                <MaterialIcons name="location-pin" size={24} color="#1E7200" />
                <Text style={fonts.greyLightBig}> Waumini Apartments</Text>
            </View>

            </TouchableOpacity>
           
        </View>

        
        

       


        <View style={styles.textView}>


            <View style={styles.customerDet}>
                

                <View style={styles.nameDetail}>
                    <Text  style={fonts.blackBoldMedium}>Request</Text>

                    <TouchableOpacity>
                    
                        <Text style={fonts.blackBoldMedium}>Plumber</Text>
                   
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
<Text style={fonts.blackLightSmall}>Hello, am looking for a plumber to 
            fix my kitchen sink, please look at the photos I sent. Its Urgent Please!</Text>
      



        <View style={styles.buttonView}>

            <Card style={styles.declineButton}>
            <TouchableOpacity >
                <Text style={fonts.blackBoldMedium}>
                Decline
                </Text>
                </TouchableOpacity>
            </Card>
         
            
            <Card style={styles.acceptButton}>
            <TouchableOpacity >
                <Text style={fonts.blackBoldMedium}>
                Accept
                </Text>
                </TouchableOpacity>
            </Card>
            
            

        </View>




    </View>





</Card>






</View>
                



                  <TitleText style={fonts.whiteBoldBig}>Pending (4)
             
                  </TitleText>


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

                    <Text allowFontScaling={false} style={fonts.blackBoldMedium}> Alice Achieng</Text>
                    <View style={styles.textView}>
                    <Icon type="material-community" 
                                                         name = "paperclip"
                                                         color= "#17304A"
                                                         size = {20}
                                                         
                                                          />
                    <Text allowFontScaling={false} style={fonts.blackBoldMedium}>See Attachment</Text>
                    </View>

                    </View>

                   
                    
                    <View style={styles.textView}>




                        <View style={styles.textView2}>
                       
                            <Text allowFontScaling={false} style={fonts.blackBoldSmall}>+254722xxxxxx</Text>
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
                           
                        <Text allowFontScaling={false} style={fonts.greyLightSmall}>500 </Text>

                       </View>

                        
                    </View>

                    <View style={styles.textView}>


<View style={styles.textView2}>
   
    <Text allowFontScaling={false} style={fonts.greyLightSmall}>Transport Charge</Text>

</View>





<View style={styles.textView2}>
   
<Text allowFontScaling={false} style={fonts.greyLightSmall}>300 </Text>

</View>


</View>



                    </View>
                    </View>





                    
            

        </Card>

        <View style={styles.textView}>
            <View style={styles.textView2}>
               
            </View>

            <View style={styles.textView2}>
               
                <Text  style={fonts.greeBoldSmall}>Ksh 800</Text>
            </View>
        </View>


        <View style={styles.textView}>
            <TouchableOpacity>
            <View style={styles.textView2}>
                <MaterialIcons name="location-pin" size={24} color="#1E7200" />
                <Text style={fonts.greyLightBig}> Waumini Apartments</Text>
            </View>

            </TouchableOpacity>
           
        </View>

        
        

       


        <View style={styles.textView}>


            <View style={styles.customerDet}>
                

                <View style={styles.nameDetail}>
                    <Text  style={fonts.blackBoldMedium}>Request</Text>

                    <TouchableOpacity>
                    
                        <Text style={fonts.blackBoldMedium}>Plumber</Text>
                   
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
<Text style={fonts.blackLightSmall}>Hello, am looking for a plumber to 
            fix my kitchen sink, please look at the photos I sent. Its Urgent Please!</Text>
      



        <View style={styles.buttonView}>

            <Card style={styles.declineButton}>
            <TouchableOpacity >
                <Text style={fonts.blackBoldMedium}>
                Cancel
                </Text>
                </TouchableOpacity>
            </Card>
         
            
            <Card style={styles.acceptButton}>
            <TouchableOpacity >
                <Text style={fonts.blackBoldMedium}>
               Waiting 
                </Text>
                </TouchableOpacity>
            </Card>
            
            

        </View>




    </View>





</Card>






</View>
                   
            



                <TitleText style={fonts.whiteBoldBig}>Active (5)</TitleText>
               
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

                    <Text allowFontScaling={false} style={fonts.blackBoldMedium}> Alice Achieng</Text>
                    <View style={styles.textView}>
                    <Icon type="material-community" 
                                                         name = "paperclip"
                                                         color= "#17304A"
                                                         size = {20}
                                                         
                                                          />
                    <Text allowFontScaling={false} style={fonts.blackBoldMedium}>See Attachment</Text>
                    </View>

                    </View>

                   
                    
                    <View style={styles.textView}>




                        <View style={styles.textView2}>
                       
                            <Text allowFontScaling={false} style={fonts.blackBoldSmall}>+254722xxxxxx</Text>
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
                           
                        <Text allowFontScaling={false} style={fonts.greyLightSmall}>500 </Text>

                       </View>

                        
                    </View>

                    <View style={styles.textView}>


<View style={styles.textView2}>
   
    <Text allowFontScaling={false} style={fonts.greyLightSmall}>Transport Charge</Text>

</View>





<View style={styles.textView2}>
   
<Text allowFontScaling={false} style={fonts.greyLightSmall}>300 </Text>

</View>


</View>



                    </View>
                    </View>





                    
            

        </Card>

        <View style={styles.textView}>
            <View style={styles.textView2}>
               
            </View>

            <View style={styles.textView2}>
               
                <Text  style={fonts.greeBoldSmall}>Ksh 800</Text>
            </View>
        </View>


        <View style={styles.textView}>
            <TouchableOpacity>
            <View style={styles.textView2}>
                <MaterialIcons name="location-pin" size={24} color="#1E7200"/>
                <Text style={fonts.greyLightBig}> Waumini Apartments (View Map)</Text>
            </View>

            </TouchableOpacity>
           
        </View>

        
        

       


        <View style={styles.textView}>


            <View style={styles.customerDet}>
                

                <View style={styles.nameDetail}>
                    <Text  style={fonts.blackBoldMedium}>Request</Text>

                    <TouchableOpacity>
                    
                        <Text style={fonts.blackBoldMedium}>Plumber</Text>
                   
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
<Text style={fonts.blackLightSmall}>Hello, am looking for a plumber to 
            fix my kitchen sink, please look at the photos I sent. Its Urgent Please!</Text>
      



        <View style={styles.buttonView}>

            
         
            
            <Card style={styles.acceptButton}>
            <TouchableOpacity  onPress={() => { navigation.replace("RatingScreen", { state: 0 }) }}>
                <Text style={fonts.blackBoldMedium}>
                Arrived
                </Text>
                </TouchableOpacity>
            </Card>
            
            

        </View>




    </View>





</Card>






</View>

</ScrollView>

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