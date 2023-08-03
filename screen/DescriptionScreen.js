import React, {useEffect, useRef, useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import TitleText from '../components/TitleText';
import { Icon } from 'react-native-elements'
import BodyText from '../components/BodyText';
import MapView, { PROVIDER_GOOGLE, } from 'react-native-maps';
import * as Location from 'expo-location';


const DescriptionScreen = ({ navigation }) => {

    const [selected, setSelected] = useState("");
    const [latlng, setLatLng] = useState({})

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
        setLatLng({ latitude: latitude, longitude: longitude })
      } catch (err) {
  
      }
    }
  
    const _map = useRef(1);
  
    useEffect(() => {
      checkPermission();
      getLocation()
      console.log(latlng)
        , []
    })

  
    const data = [
        { key: '1', value: 'Mason', disabled: true },
        { key: '2', value: 'Electrician' },
        { key: '3', value: 'Plumber' },

    ]



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

               

                    <SelectList
                        style={styles.dropdown}
                        setSelected={(val) => setSelected(val)}
                        data={data}
                        save="value"
                    />


                    <BodyText style={styles.Text}>Description of your problem</BodyText>
                    <TextInput
                        style={styles.input}

                        multiline
                        placeholder="Description"

                    />


                    <BodyText style={styles.Text}>Upload an image/s | Take a photo</BodyText>


                    <View style={styles.imageview}>

                    </View>

                    <Card style={styles.button}>



                        <TitleText style={styles.Text}>Upload</TitleText>


                    </Card>



                    <View style={styles.buttonView}>
                        <TouchableOpacity onPress={() => { navigation.navigate("ListingScreen", { state: 0 }) }}>

                            <Card style={styles.submitbutton}>


                                <TitleText style={styles.Text}>Request Service</TitleText>


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
        width: '80%',
        borderColor: 'white',
        height: '30%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8
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
        bottom: 45,
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 48,

    },
    map: {
        height: "100%",
        width: "100%",
      },



});

export default DescriptionScreen;