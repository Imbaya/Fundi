import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList, Text, } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import { SERVICES } from '../data/services';
import Services from '../components/Services';
import { Icon } from 'react-native-elements';
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText';
import QuoteTable from '../components/QuoteTable';
import { QUOTE } from '../data/services';


const ConfirmScreen = ({ navigation }) => {


    
 

return (


    <View style={styles.container}>
        

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

                

                <Card style={styles.card}>
                    <View style={styles.textView}>
                        <TitleText style={styles.Text}>John is on his way</TitleText>

                    </View>
                    <View style={styles.flatlist}>
                    <Image
                            source={require('../assets/Fundi.png')}
                            style={styles.image}
                        // resizeMode="cover" 
                        />

                    </View>


                    <View style={styles.buttonView}>


                   


                        
                    </View>

                    <View style={styles.buttonView2}>
                    <TouchableOpacity onPress={() => { navigation.navigate("QuoteScreen", { state: 0 }) }}>

<Card style={styles.backButton}>


    <TitleText style={styles.Text}>CANCEL JOB</TitleText>


</Card>

</TouchableOpacity>
</View>

                </Card>


            </View>
        

    </View>





)
};


const styles = StyleSheet.create({

container: {
    flex: 1,

    // alignItems: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
        justifyContent: 'center',
},

table: {
  width: Dimensions.get('window').width * 0.8,
  //  paddingLeft: '15%',
    
       // width: '80%',
        borderRadius: 8,
        borderStyle: 'dashed',
        //height: '25%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'black'

},

image: {
    height: Dimensions.get('window').width * 0.5,
    width: Dimensions.get('window').width * 0.5,
    borderRadius: 120,
    backgroundColor: '#17304A'
},

imageBackground: {
    flex: 1,
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
},

logo: {
    padding: 10
},

Text: {
    fontFamily: 'Lexend-bold'
},

textView: {
    paddingTop: 20
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

userIcon: {
    position: "absolute",
    top: 50,
    right: 12,
    backgroundColor: 'grey',
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

Text: {
    fontWeight: 'bold',

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

backButton: {
    //  flex: 1,

    backgroundColor: '#ffff',
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 48,
    shadowOpacity: 0.2,
    borderColor: '#8CC740',
    borderWidth: 1,
    
},


flatlist: {
    paddingTop: '40%',
    backgroundColor: 'transparent',
    //width: '20%',
    justifyContent: 'center',
        alignItems: 'center',
},

card: {
    flex: 1,
    backgroundColor: '#F5F2F0',

    width: Dimensions.get('window').width * 1,
  //  justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: Dimensions.get('window').height * 0.75,
    shadowOpacity: 0.2,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
   // justifyContent: 'space-evenly'
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



});

export default ConfirmScreen;