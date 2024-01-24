import React, { useState, useEffect } from 'react';
import { View, Modal, StyleSheet, Image, ImageBackground, Pressable, Text, TouchableOpacity, Linking } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import { fonts } from '../components/fonts';
import { Icon } from 'react-native-elements';
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText';
import { ScrollView, TextInput } from 'react-native-gesture-handler';


const MemberProfile = ({ navigation, route }) => {

    const [contactVisible, setContactVisible] = useState(false);
    const [userdisplayname, setUserDisplayName] = useState("");
  const [userphonenumber, setUserPhoneNumber] = useState("");
  const [useremail, setUserEmail] = useState("");

  {/*
  const getCurrentUserDetails = async () => {
    const docRef = doc(db, 'users', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log(docSnap.data());
      setUserDisplayName(docSnap.data().username);
      setUserPhoneNumber(docSnap.data().phonenumber);
    } else {
      console.log('No such document!');
    }
  }
  
  useEffect(() => {
    getCurrentUserDetails();
  }, []);
*/}

    const openWebsite = () => {
        const url = 'https://www.rekebisha.com/'; // replace with your website URL
        Linking.openURL(url).catch((err) =>
          console.error('An error occurred', err)
        );
      };


      const callUs = () => {
        const url= "tel:+254700600679";
        Linking.openURL(url).catch((err) =>
        console.error("An error occured", err));
      };

      const openWhatsApp = () => {
        const phoneNumber = '+254700600679'; // Replace with the phone number you want to open in WhatsApp
        const url = `whatsapp://send?phone=${phoneNumber}`;
        
        Linking.openURL(url).catch((err) =>
          console.error('An error occurred', err)
        );
      };

      
const sendEmail = () => {
    const email = 'mailto:rekebisharepair@gmail.com';
    Linking.openURL(email).catch((err) =>
      console.error('An error occurred', err)
    );
  };

{/*
     const handleSignOut = (e) => {
  e.preventDefault();

  signOut(auth)
    .then(() => {
      navigation.navigate("LoginScreen");
    })
    .catch(error => alert(error.message))
}
    
*/}

    return (

        <View style={styles.container}>


            <View style={styles.iconView}>
                <Icon
                    type="material-community"
                    name="arrow-left"
                    //color = {colors.grey1}
                    size={35}
                    onPress={() => { navigation.navigate("RequestScreen", { state: 0 }) }}
                />
            </View>



            <ImageBackground
                source={require('../assets/IconlessBackground.jpg')}
                resizeMode="cover"
                style={styles.imageBackground}
            >

                <View style={styles.banner}>

                    <Image
                        source={require('../assets/DotDotBanner.jpg')}
                        style={styles.bannerimage}
                    // resizeMode="cover" 
                    />

                </View>

                <View style={styles.memberInfo}>
                    <View style={styles.profilePic}>


                    </View>

                    
                    <View style={styles.memberDetails}>
                        <Text style={fonts.whiteBoldBig}>username</Text>
                        <Text style={fonts.whiteBoldBig}>phonenumber</Text>
                        <Text style={fonts.whiteBoldBig}>email</Text>
                    </View>
                </View>








                <View style={styles.horizontalView}>

                    <TouchableOpacity   onPress={() => {
                                    setContactVisible(true);
                                }}>
                        <View style={styles.cardView}>

                            <Card style={styles.card}>



                                <View style={styles.textView}>
                                    <Icon
                                        type="material-community"
                                        name="contacts-outline"
                                        color='#8CC740'
                                        size={35}

                                    />
                                    <BodyText style={fonts.blackBoldBig}>Contact Us</BodyText>

                                </View>

                            </Card>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={openWebsite}>
                        <View style={styles.cardView}>

                            <Card style={styles.card}>



                                <View style={styles.textView}>

                                    <Icon
                                        type="material-community"
                                        name="clipboard-file-outline"
                                        color='#8CC740'
                                        size={35}

                                    />
                                    <BodyText style={fonts.blackBoldBig}>About Us</BodyText>


                                </View>

                            </Card>

                        </View>
                    </TouchableOpacity>





                </View>

                <View style={styles.horizontalView}>

                    <TouchableOpacity  >
                        <View style={styles.cardView}>

                            <Card style={styles.card}>



                                <View style={styles.textView}>
                                    <Icon
                                        type="material-community"
                                        name="logout"
                                        color='#8CC740'
                                        size={35}

                                    />
                                    <BodyText style={fonts.blackBoldBig}>Sign Out</BodyText>

                                </View>

                            </Card>

                        </View>
                    </TouchableOpacity>







                </View>




                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={contactVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setContactVisible(!contactVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.contactModalView}>

                            <View style={styles.modalHeading}>
                                <Text style={fonts.greenBoldBig}>Contact</Text>
                                <Pressable
                                    style={[styles.closeButton]}
                                    onPress={() => setContactVisible(!contactVisible)}>
                                    <Icon
                                        type="material-community"
                                        name="close"
                                        color='grey'
                                        size={20}

                                    />
                                </Pressable>
                            </View>


                            <View style={styles.modalButtonView}>
                                <TouchableOpacity onPress={callUs} >

                                    <Card style={styles.modalButton}>


                                        <TitleText style={fonts.greenBoldBig}>Call us +254712345678</TitleText>


                                    </Card>

                                </TouchableOpacity>

                            </View>

                            <View style={styles.modalButtonView}>
                                <TouchableOpacity onPress={openWhatsApp}>

                                    <Card style={styles.modalButton}>


                                        <TitleText style={fonts.greenBoldBig}>Whatsapp Us</TitleText>


                                    </Card>

                                </TouchableOpacity>

                            </View>

                            <View style={styles.modalButtonView}>
                                <TouchableOpacity onPress={sendEmail} >

                                    <Card style={styles.modalButton}>


                                        <TitleText style={fonts.greenBoldBig}>Email us at xxx@mail.com</TitleText>


                                    </Card>

                                </TouchableOpacity>

                            </View>




                        </View>





                    </View>
                </Modal>





            </ImageBackground>
        </View>
    )
};


const styles = StyleSheet.create({

    container: {
        flex: 1,

        // alignItems: 'center',
        justifyContent: 'space-around',
        height: Dimensions.get('window').height * 1
    },

    back: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },

    imageBackground: {
        //  flex: 1,
        //  justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    banner: {
        height: '20%',
        width: Dimensions.get('window').width * 1,
        borderBottomRadius: 50
    },

    bannerimage: {
        height: '100%',
        width: '100%'

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

    memberInfo: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5
    },

    profilePic: {
        height: 120,
        width: 120,
        backgroundColor: 'grey',
        borderRadius: 120
    },

    memberDetails: {
        width: '100%',
        padding: 20,

        // flexDirection: 'row',
    },

    summaryView: {
        paddingHorizontal: 10,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    summaryContentView: {
        borderWidth: 0.5,
        width: '50%',
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
    },

    textView: {
        justifyContent: 'center',
        alignItems: 'center',
        //  position: 'absolute',
        // paddingTop: '10%'
    },

    horizontalView: {
        paddingTop: 5,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },

    cardView: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        //backgroundColor: 'blue'
    },

    card: {
        shadowOpacity: 0.05,
        shadowRadius: 10,
        width: Dimensions.get('window').width * 0.45,
        height: 100,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },

    card2: {
        shadowOpacity: 0.05,
        shadowRadius: 10,
        width: Dimensions.get('window').width * 0.45,
        height: 100,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',

    },

    ///MODAL STYLES////
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)'
        //  marginTop: 22,
    },
    modalView: {
        width: '90%',

        //  height: 200,
        margin: 20,
        backgroundColor: '#17304A',
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
        borderRadius: 20,
        //padding: 10,
        // elevation: 2,
        width: 35,
        height: 35,
        backgroundColor: 'white',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-around'
    },
    modalHeading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingBottom: 5,
        borderBottomColor: 'white'
    },

    input: {
        width: '70%',
        borderColor: 'white',
        height: 25,
        // margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5
    },

    modalContent: {
        width: 220,
        height: 200,
        justifyContent: 'space-between',
        paddingTop: 10
    },

    button: {
        // flex: 1,
        borderWidth: 0.5,

        // width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 25,
        shadowOpacity: 0.2,
    },


        //MODAL STYLES////
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            //  marginTop: 22,
        },
        modalView: {
            width: '90%',
    
            height: '50%',
            margin: 20,
            backgroundColor: '#17304A',
            borderRadius: 10,
            padding: 5,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        closeButton: {
            borderRadius: 20,
            padding: 10,
            // elevation: 2,
            width: 40,
            backgroundColor: 'white'
        },
        modalHeading: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingBottom: 5,
            borderBottomColor: 'white'
        },
    
        contactModalView: {
            width: '90%',
    
            height: '25%',
            margin: 20,
            backgroundColor: '#17304A',
            borderRadius: 10,
            padding: 5,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },

        modalButton: {
            // flex: 1,
             borderWidth: 0.5,
     
             width: '100%',
             justifyContent: 'center',
             alignItems: 'center',
             borderRadius: 5,
             height: 30,
             shadowOpacity: 0.2,
         },
    
         modalButtonView: {
            // flex: 1,
            // borderWidth: 0.5,
     
             width: '90%',
            // justifyContent: 'center',
          //   alignItems: 'center',
             borderRadius: 5,
             height: 30,
             shadowOpacity: 0.2,
             paddingTop: 20
         },



});

export default MemberProfile;