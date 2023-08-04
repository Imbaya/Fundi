import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList, Text, TextInput, ImageBackground } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import { SERVICES } from '../data/services';
import Services from '../components/Services';
import { Icon } from 'react-native-elements';
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText';
import QuoteTable from '../components/QuoteTable';
import { QUOTE } from '../data/services';
import { fonts } from '../components/fonts';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const LastScreen = ({ navigation }) => {




  return (


    <View style={styles.container}>

<ImageBackground
                source={require('../assets/4k-background.png')}
                resizeMode="cover"
                style={styles.imageBackground}
            >





      <View style={styles.gridView}>



        <Card style={styles.card}>

          <View style={styles.flatlist}>

            <Image
              //  source={require('../assets/thumb.png')}
              style={styles.image}
            // resizeMode="cover" 
            />
            <TitleText style={fonts.blackBoldBig}>Alice Achieng'</TitleText>

            <View style={styles.horizontal}>
              <MaterialIcons name="location-pin" size={24} color="#1E7200" />
              <TitleText style={fonts.blackBoldMedium}>Waumini Apartments, House 14</TitleText>


            </View>
<View style={styles.comments}>
            <TitleText style={fonts.blackBoldMedium}>Comments</TitleText>

            <TextInput
                        style={styles.input}
                     //   value={description}
                     //   onChangeText={(text) => setDescription(text)}
                        multiline
                        placeholder="Description"

                    />

<View style={styles.horizontal}>
 
  </View>
          </View>


          

           
            


            
          </View>





          <View style={styles.buttonView0}>









            <View style={styles.buttonView}>


              <TouchableOpacity onPress={() => { navigation.navigate("HomeScreen", { state: 0 }) }}>

                <Card style={styles.submitbutton}>


                  <TitleText style={styles.Text}>SUBMIT</TitleText>


                </Card>

              </TouchableOpacity>



            </View>

          </View>

        </Card>


      </View>
      </ImageBackground>

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
    height: Dimensions.get('window').width * 0.3,
    width: Dimensions.get('window').width * 0.3,
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
    //  position: 'absolute',
    //bottom: 90,
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 48,
    //padding: 20

  },

  buttonView0: {


    zIndex: 30,
    //position: 'absolute',
    //  bottom: 1,
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    //borderRadius: 100,
    // height: 48,
    //padding: 20

  },

  buttonView2: {


    zIndex: 30,
    // position: 'absolute',
    //  bottom: 45,
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

    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    //  flex: 1,
    backgroundColor: '#F5F2F0',

    width: Dimensions.get('window').width * .89,
    //  justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 100,
    height: 500,
    shadowOpacity: 0.2,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    justifyContent: 'space-between',
    paddingBottom: 50
  },





  gridView: {


    zIndex: 30,
    // position: 'absolute',
    // bottom: 0,
    width: Dimensions.get('window').width * 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 100,
    height: Dimensions.get('window').height * 0.75,

  },

  buttonText: {
    fontWeight: 'bold',

  },

  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },

  input: {
    width: '90%',
    borderColor: 'white',
    height: '50%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8
},


imageBackground: {
  flex: 1,
  justifyContent: 'center',
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
},

  comments: {
    width: '80%'
  }



});

export default LastScreen;