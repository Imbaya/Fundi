import React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import TitleText from '../components/TitleText';
import MapView, { PROVIDER_GOOGLE, } from 'react-native-maps';
import * as Location from 'expo-location';
import { Icon } from 'react-native-elements';
import { auth, db } from '../Database/config';
import { setDoc, doc } from "firebase/firestore";

const HomeScreen =({ navigation }) => {

    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

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
  
    useEffect(() => {
      checkPermission();
      getLocation()
        , []
    })
   
    return (


        <View style={styles.container}>


<View style={styles.iconView}>
                <Icon
                    type="material-community"
                    name="menu"
                    //color = {colors.grey1}
                    size={35}
                    onPress={() => { navigation.toggleDrawer() }}
                />





            </View>


<View style={styles.buttonView}>
            <TouchableOpacity   onPress={() => { navigation.replace("GigScreen", { state: 0 }) }}>

                <Card style={styles.button}>

                    
                        <TitleText style={styles.buttonText}>Check Request</TitleText>
                    

                </Card>

            </TouchableOpacity>
            </View>


            <MapView
                ref={_map}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                showsUserLocation={true}
                followsUserLocation={true}
                
            > 
        
            </MapView>


        </View>





    )
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
       // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 48,
       shadowOpacity: 0.2,
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

    buttonView: {


        zIndex: 30,
        position: 'absolute',
        bottom: 92,
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 48,
        
    },

    buttonText: {
      //  fontWeight: 'bold',
        fontFamily: 'Lexend-light'
        
    },
    map: {
        height: "100%",
        width: "100%",
      },



});

export default HomeScreen;