import React from 'react';
import { StyleSheet, View, Dimensions, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

import Card from './card'
import TitleText from './TitleText';
import SubText from './SubText';
import { Icon } from 'react-native-elements';


const Gigs = props => {
    return (

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

    
<TitleText style={styles.details}> {props.name}</TitleText>

<View style={styles.subName}>
<Icon
                    type="material-community"
                    name="timer"
                    color = 'red'
                    size={20}
                  
                />
<SubText style={styles.subtxt}>10min</SubText>

<Icon
                    type="material-community"
                    name="star"
                    color = '#F5EC04'
                    size={20}
                
                />
<SubText  style={styles.subtxt}>3.5</SubText>
</View>
</View>

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

</View>
</View>







                <View style={styles.productDetails}>
                    <View >
                        <View style={styles.location}>
                        
                        <TitleText style={styles.detail}>{props.location}</TitleText>

                        </View>
                        <TitleText style={styles.title}>Request</TitleText>
                        <TitleText style={styles.detail}>{props.service}</TitleText>

                        <TitleText style={styles.title}>Remarks</TitleText>
                        <TitleText style={styles.detail}>{props.remarks}</TitleText>


                        <View style={styles.buttonView}>

                            <View style={styles.buttonContainer}>
                                <Card style={styles.button}>



                                    <TitleText style={styles.declineText}>Decline</TitleText>


                                </Card>
                            </View>

                            <TouchableOpacity   onPress={props.onSelect}>
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

};


const styles = StyleSheet.create({

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
         paddingVertical: 15
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

export default Gigs;