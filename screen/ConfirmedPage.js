import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList, Text } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import { SERVICES } from '../data/services';
import Services from '../components/Services';
import { Icon } from 'react-native-elements';
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText';
import QuoteTable from '../components/QuoteTable';
import { QUOTE } from '../data/services';


const ConfirmedScreen = ({ navigation }) => {


    const renderQuoteItem = itemData => {
        return (
            ////COMPONENT IMPORTED TO RENDER FLATLIST ITEMS//////
            <QuoteTable
                description={itemData.item.description}

                
                amount={itemData.item.amount}
                
              //  onSelect={() => { navigation.navigate("DescriptionScreen", { state: 0 }) }}


            />
        )
    }
 

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

        
       

            <View style={styles.gridView}>

                

                <Card style={styles.card}>
                    <View style={styles.textView}>
                        <TitleText style={styles.Text}>Work in progress</TitleText>

                    </View>
                   


                    <View style={styles.buttonView}>


                    <TouchableOpacity onPress={() => { navigation.navigate("ConfirmScreen", { state: 0 }) }}>

<Card style={styles.backButton}>


    <TitleText style={styles.Text}>CHAT</TitleText>


</Card>

</TouchableOpacity>


                        
                    </View>

                    <View style={styles.buttonView2}>
                    <TouchableOpacity onPress={() => { navigation.replace("PaymentScreen", { state: 0 }) }}>

<Card style={styles.submitbutton}>


    <TitleText style={styles.Text}>DONE</TitleText>


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
    justifyContent: 'space-around'
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
    paddingTop: 50
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
    paddingTop: 10,
    backgroundColor: 'transparent',
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
    borderTopRightRadius: 70
},



image: {
    //height: Dimensions.get('window').width * 0.25,
    //  width: Dimensions.get('window').width * 0.25,

},


gridView: {


    zIndex: 30,
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width * 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: Dimensions.get('window').height * 0.5,

},

buttonText: {
    fontWeight: 'bold',

},



});

export default ConfirmedScreen;