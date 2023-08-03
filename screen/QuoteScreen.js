import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import TitleText from '../components/TitleText';
import { Icon } from 'react-native-elements'
import MapView, { PROVIDER_GOOGLE, } from 'react-native-maps';
import * as Location from 'expo-location';
import { db } from '../Database/config';




const QuoteScreen = ({ navigation }) => {

    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [address, setAddress] = useState('');
    const [budgetItems, setBudgetItems] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');


    //Add Bugdet Items
    const handleAddBudgetItem = () => {
        const newBudgetItem = {
          description: description,
          amount: Number(amount),
        };
    
        setBudgetItems([...budgetItems, newBudgetItem]);
        setDescription('');
        setAmount('');
      };

      //Add Budget to firebase
      const uploadQuote = async () => {
        const currentuserQuote = Math.floor(100000+Math.random()*9000).toString();

        try {
              await db.collection('Quotation').doc(currentuserQuote).set({ budgetItems });
              console.log('Budget saved successfully!');
              Alert.alert("Quote Sent");
          } catch (error) {
              console.error('Error saving budget:', error);
          }
          
        // Clear input fields and budget items after saving
        setDescription('');
        setAmount('');
        setBudgetItems([]);
    }

    ///Access user location and permission
    const checkPermission = async () => {
        const hasPermission = await Location.requestForegroundPermissionsAsync();
        if (hasPermission.status === 'granted') {
            const permission = await askPermission();
            return permission
        }
        return true
    };

    const askPermission = async () => {
        const permission = await Location.requestBackgroundPermissionsAsync();
        return permission.status === 'granted';
    };


    const getLocation = async () => {
        try {
            const { granted } = await Location.requestBackgroundPermissionsAsync();
            if (!granted) return;
            const {
                coords: { latitude, longitude },
            } = await Location.getCurrentPositionAsync();
            setLatitude(latitude);
            setLongitude(longitude);
        } catch (err) {

        }
    }

    const _map = useRef(1);

    //run the functions in the background
    useEffect(() => {
        checkPermission();
        getLocation();
        geocode();
        console.log([latitude, longitude])
            , []
    })






    //Get the Town using Latitude and Longitude
    const geocode = async () => {
        const geocodedAddress = await Location.reverseGeocodeAsync({
            longitude: longitude,
            latitude: latitude
        });
        setAddress(geocodedAddress[0].city);
        console.log('reverseGeocode:');
        console.log(geocodedAddress[0].city);

    }

    



    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.container}>
                <MapView
                    ref={_map}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    showsUserLocation={true}
                    followsUserLocation={true}

                >
                </MapView>
                
                <View style={styles.iconView}>
                    <Icon
                        type="material-community"
                        name="menu"
                        //color = {colors.grey1}
                        size={35}
                        onPress={() => { navigation.navigate("RequestScreen", { state: 0 }) }}
                    />





                </View>



                <View style={styles.gridView}>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    //   style={styles.container}
                    >
                        <Card style={styles.card}>
                            <TitleText style={styles.Text}>Please draft a quotation for the client</TitleText>
                            <View style={styles.inputFields}>
                                <TextInput
                                    style={styles.input}
                                    value={description}
                                    onChangeText={text => setDescription(text)}
                                    placeholder="Description"
                                   
                                />
                                <TextInput
                                    style={styles.input2} 
                                    value={amount}
                                    placeholder="Amount"
                                    keyboardType="numeric"
                                    onChangeText={(amount) => setAmount(amount)}
                                />

                                <Icon
                                    style={styles.icon}
                                    type="material-community"
                                    name="plus"
                                    //color = {colors.grey1}
                                    size={40}
                                onPress={handleAddBudgetItem}
                                />

                            </View>
                            
                            <View style={styles.buttonView}>
                                <TouchableOpacity onPress={() => { navigation.replace("ConfirmScreen", { state: 0 }) }}>
                                    <Card style={styles.submitbutton}>
                                        <TitleText style={styles.Text}>SUBMIT</TitleText>
                                    </Card>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.buttonView2}>
                                <TouchableOpacity onPress={() => { navigation.replace("GigScreen", { state: 0 }) }} >
                                    <Card style={styles.backButton}>
                                        <TitleText style={styles.Text}>GO BACK</TitleText>
                                    </Card>
                                </TouchableOpacity>
                            </View>

                        </Card>
                    </KeyboardAvoidingView>

                </View>
            </View>

        </TouchableWithoutFeedback>
    )
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, alpha)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputFields: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },


    iconView: {
        position: "absolute",
        top: 50,
        left: 12,
        backgroundColor: '#8CC740',
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
        zIndex: 8
    },

    dropdown: {
        width: '80%'
    },

    flatlist: {
        paddingTop: 50,
        backgroundColor: 'transparent'
    },

    card: {
        flex: 1,
        backgroundColor: '#F5F2F0',

        width: Dimensions.get('window').width * 1,
        paddingTop: 47,
        alignItems: 'center',
        borderRadius: 100,
        height: Dimensions.get('window').height * 0.75,
        shadowOpacity: 0.2,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70
    },
    gridView: {
        zIndex: 30,
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width * 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: Dimensions.get('window').height * 0.75,
    },
    buttonText: {
        fontWeight: 'bold',

    },

    input: {
        width: '60%',
        borderColor: 'white',
        //  height: '30%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8
    },
        input2: {
        width: '20%',
        borderColor: 'white',
        //  height: '30%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8
    },
    icon: {
        //  width: '40%',
        // borderColor: 'white',
        //  height: '30%',
        margin: 12,
        // borderWidth: 1,
        // padding: 10,
        // backgroundColor: 'white',
        // borderRadius: 8
    },
    buttonText: {
        fontWeight: 'bold',

    },
    button: {
        //  flex: 1,
        width: Dimensions.get('window').width * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 24,
        shadowOpacity: 0.2,
    },
    imageview: {
        width: '80%',
        borderRadius: 8,
        borderStyle: 'dashed',
        height: '25%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'black'
    },
    Text: {
        fontWeight: 'bold',
        fontFamily: 'Lexend-bold'

    },
    submitbutton: {
        //  flex: 1,
        backgroundColor: '#8CC740',
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 48,
        shadowOpacity: 0.2,
    },

    buttonView: {


        zIndex: 30,
        position: 'absolute',
        bottom: 90,
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 48,
        //padding: 20

    },

    buttonView2: {


        zIndex: 30,
        position: 'absolute',
        bottom: 45,
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 48,
        paddingTop: 20

    },

    backButton: {

        //  flex: 1,
        borderWidth: 1,
        borderColor: '#8CC740',
        backgroundColor: 'white',
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 48,
        shadowOpacity: 0.2,
    },


   
    map: {
        height: "100%",
        width: "100%",
    },



});

export default QuoteScreen;