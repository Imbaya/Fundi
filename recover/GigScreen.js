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
    const renderItem = ({ item }) => (
                <View style={styles.productView}>

                <Card style={styles.gigCard}>

                    <View 
                    style= {styles.name}
                    >

                    <Image
                        source={require('../assets/icon.png')}
                        style={styles.image}
                    // resizeMode="cover" 
                    />
                    <View style={styles.name1}>

                    <View>


                    <TitleText style={styles.details}> {item.Username}</TitleText>

                    <View style={styles.subName}>
                    <Icon
                                    type="material-community"
                                    name="timer"
                                    color = 'red'
                                    size={20}
                                
                                />
                    <SubText style={styles.subTxt}>10min, {item.Town}</SubText>

                    <Icon
                                    type="material-community"
                                    name="star"
                                    color = '#F5EC04'
                                    size={20}
                                
                                />
                    <SubText  style={styles.subTxt}>3.5,</SubText>
                    </View>
                    </View>

                    <TouchableOpacity>

                    <View style={styles.attachment}>
                    <Icon
                                    type="material-community"
                                    name="attachment"
                                    //color = {colors.grey1}
                                    size={35}
                                    //onPress={() => { navigation.navigate("RequestScreen", { state: 0 }) }}
                                />

                    <TitleText style={styles.title}>See attachment</TitleText>
                    </View>
                    </TouchableOpacity>

                    </View>
                    </View>


            <View style={styles.productDetails}>
                <View >
                    <View style={styles.location}>
                    
                    <TitleText style={styles.detail}>{item.latitude}</TitleText>

                    </View>
                    <TitleText style={styles.title}>Request</TitleText>
                    <TitleText style={styles.detail}>{item.Description}</TitleText>

                    <TitleText style={styles.title}>Remarks</TitleText>
                    <TitleText style={styles.detail}>{item.Category}</TitleText>


                    <View style={styles.buttonView}>

                        <View style={styles.buttonContainer}>
                            <Card style={styles.button}>



                                <TitleText style={styles.declineText}>Decline</TitleText>


                            </Card>
                        </View>

                        <TouchableOpacity  onPress={() => { navigation.replace("QuoteScreen", { state: 0 }) }}  >
                        <Card style={styles.requestButton}>



                            <TitleText style={styles.buttonText}>Send Quote</TitleText>


                        </Card>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </Card>

    </View>

      );
    




    return (


        <View style={styles.container}>
            <ImageBackground
                    resizeMode="cover"
                    style={styles.imageBackground}
                >


            <View style={styles.statsView}>

                <Card style={styles.statsCard}>
                    <TitleText>Ksh 36,237</TitleText>
                    <TitleText>Overall earnings</TitleText>
                </Card>

                <Card style={styles.statsCard}>
                    <TitleText>5</TitleText>
                    <TitleText>Today's Bookings</TitleText>
                </Card>


            </View>

            <TitleText style={styles.title1}>New Gigs: {address}</TitleText>

            <View style={styles.gigs}>
                <FlatList
                   onRefresh={getGigs}
                    data={allgigs}
                    refreshing={refreshing}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    numColumns={1}
                />

            </View>
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
        paddingTop: 300
    },

    title1: {
        fontFamily: 'Lexend-light',
        fontSize: 25,
        paddingLeft:20,
        color: 'white',
        fontWeight: 'bold'
        
        

    },
    gigs:{
        padding:20
    },

    statsCard: {
        width: 164,
        height: 80,
        shadowColor: 'white',
        padding:10
    },

    statsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
     //   paddingHorizontal: 15
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    bold: {
        fontWeight: '400',
        color: 'black',
        fontSize: 25

    },

    attachment: {
//paddingLeft: 20
//position: "absolute",
      //top: 50,
      right: -20,
      //paddingBottom: 20
    },

    gigCard: {
        padding: 10,
        shadowColor: 'white',
    },

    name:{
flexDirection: 'row',
alignItems: 'center',
//justifyContent: 'space-between'
    },

    name1:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        justifyContent: 'space-between'
            },

    subName:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
            },
 
            subTxt: {
                paddingHorizontal:10
            },

    button: {
        //  flex: 1,

        //paddingHorizontal: 20,
        width: 105,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 32,
        shadowOpacity: 0.2,
     
       borderColor: 'red',
       borderWidth: 1
    },

    requestButton: {
        //  flex: 1,

        //paddingHorizontal: 20,
        width: 105,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 32,
        shadowOpacity: 0.2,
        backgroundColor: '#8CC740',
    },

    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10



    },

    buttonContainer: {
        paddingHorizontal: 5
    },

    price: {

        justifyContent: 'center'

    },

    details: {
        fontFamily: 'Lexend-light',
        fontSize: 18

    },

    detail: {
        fontWeight: '400',
        color: 'black',
        fontSize: 14.5,
        fontFamily: 'Lexend-lighter',
        paddingTop: 5

    },

    declineText: {
     
        color: 'red',
        fontSize: 18,
        fontFamily: 'Lexend-light',
       
    },

    buttonText: {
     
       
        fontSize: 18,
        fontFamily: 'Lexend-light',
       
    },


    title: {
       // fontWeight: '400',
       // color: 'black',
        fontSize: 16,
        fontFamily: 'Lexend-light',
        paddingTop: 5

    },

    productView: {
        // textAlign: 'left',
        // width: Dimensions.get('window').width * 0.5,
       //  paddingHorizontal: 20,
         paddingVertical: 15,
         paddingTop: 10
        //alignItems: 'flex-end'
    },

    product: {
        paddingBottom: 20,
        flexDirection: 'row',
        //height: Dimensions.get('window').width * 0.5,
        width: Dimensions.get('window').width * 0.9,
        justifyContent: 'space-around',

        borderBottomColor: 'black',
        //overflow: 'hidden',
        // marginVertical: 3,
        // marginHorizontal: 6
    },

    image: {
        height: Dimensions.get('window').width * 0.15,
        width: Dimensions.get('window').width * 0.15,
        borderRadius: 120
    },

    productDetails: {
        // position: 'absolute',
        //width: Dimensions.get('window').width * 0.46,
        //height: Dimensions.get('window').width * 0.15,
        //padding: 5,

        //bottom: 0,
        //alignContent: 'center',
        // backgroundColor: 'white',
        //backgroundColor: 'rgba(255, 255, 255, 0.6)',
        //flexDirection: 'row',
        // justifyContent: 'space-between'
    },

    prodicons: {
        paddingHorizontal: Dimensions.get('window').width * 0.25,
        paddingVertical: Dimensions.get('window').width * 0.05,
        justifyContent: 'space-between'
    },

    scroll: {
        width: Dimensions.get('window').width * 0.95,

    }




});

export default GigScreen;