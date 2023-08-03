import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import TitleText from '../components/TitleText';
import { Dimensions } from 'react-native';
import Card from '../components/card';
import BodyText from '../components/BodyText';
import SubText from '../components/SubText';
import { Icon } from 'react-native-elements';
import ConfirmButton from '../components/confirmButton';
import ArrivedButton from '../components/arrivedButton';




const ArrivedScreen = ({ navigation }) => {

 
 


  











  // ref
  const bottomSheetRef = useRef(1);

  // variables
  const snapPoints = useMemo(() => ['40%', '18.5%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      //   style={styles.bottomSheet}
      >
        <View style={styles.contentContainer}>



          <View
            style={styles.name}
          >




            <View style={styles.profileView}>

              <Image
                source={require('../assets/icon.png')}
                style={styles.image}
              // resizeMode="cover" 
              />


              <TitleText style={styles.details}> Merald Wanjiru</TitleText>


            </View>

            <View style={styles.name1}>

              <View style={styles.attachment}>
                <Icon
                  type="material-community"
                  name="message"
                  color = 'grey'
                  size={35}
                //onPress={() => { navigation.navigate("RequestScreen", { state: 0 }) }}
                />


              </View>

            </View>
          </View>
<View style={styles.bar}></View>
<View style={styles.descriptionView}>

          <TitleText style={styles.title}>Request</TitleText>
                        <TitleText style={styles.detail}>Plumber</TitleText>

                        <TitleText style={styles.title}>Remarks</TitleText>
                        <TitleText style={styles.detail}>Hi, My bathtub shower broke, its pouring water allover my bathroom, I need a plumber right away.</TitleText>

                        </View>

        </View>





      </BottomSheet>
<ArrivedButton
onSelect={() => { navigation.replace("ConfirmationScreen", { state: 0 }) }}

/>
      


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    //  backgroundColor: 'grey',
    //borderRadius: 30
  },

  descriptionView: {
width: '80%'
  },

  bottomSheet: {
    backgroundColor: 'blue',
  },


  detail: {
    fontWeight: '400',
    color: 'black',
    fontSize: 14.5,
    fontFamily: 'Lexend-lighter',
    paddingTop: 5

},


  title: {
    // fontWeight: '400',
    // color: 'black',
     fontSize: 16,
     fontFamily: 'Lexend-light',
     paddingTop: 5

 },


  attachment: {
    //paddingLeft: 20
    //position: "absolute",
    //top: 50,
    //   right: -20,
    //paddingBottom: 20
  },

  profileView: {
    flexDirection: 'row',
    alignItems: 'center'
  },


  name: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
   // height: '100%'
   paddingBottom: 5
  },

  bar: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    height: 42,
    width: '80%'
  },

  name1: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-between'
  }, 

  details: {
    fontFamily: 'Lexend-light',
    fontSize: 18

  },

  image: {
    height: Dimensions.get('window').width * 0.15,
    width: Dimensions.get('window').width * 0.15,
    borderRadius: 120
  },

  

 

  


  flatlist: {
    paddingTop: '30%',
    backgroundColor: 'transparent',
    //width: '20%',
    justifyContent: 'center',
    alignItems: 'center',

  },



  Text: {
    fontFamily: 'Lexend-bold'
  },

  Text2: {
    fontFamily: 'Lexend-bold',
    paddingTop: '15%'
  },


  contentContainer: {
    // flex: 1,
    alignItems: 'center',


  },
});

export default ArrivedScreen;