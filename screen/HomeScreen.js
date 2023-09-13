import React, {useState,useRef,useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import TitleText from '../components/TitleText';
import { Icon } from 'react-native-elements';
import MapView, { Marker, PROVIDER_GOOGLE,  } from 'react-native-maps';
import { PermissionsAndroid } from 'react-native';
import * as Location from 'expo-location';


const HomeScreen =({ navigation }) => {
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

 
useEffect(() => {
  (async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
      } else {
        setErrorMsg('Permission to access location was denied');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  })();
}, []);

    return (


        <View style={styles.container}>

{location ? (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
            description="You are here!"
          />
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}


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