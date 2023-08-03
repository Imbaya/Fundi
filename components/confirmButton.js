import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Card from './card';
import { Dimensions } from 'react-native';
import TitleText from './TitleText';

const ConfirmButton =   props => {
  return (

    <View style={styles.buttonView2}>
      <TouchableOpacity onPress={props.onSelect}>

        <Card style={styles.confirmButton}>


          <TitleText style={styles.Text}>Confirm</TitleText>


        </Card>

      </TouchableOpacity>



      <TouchableOpacity onPress={() => { navigation.navigate("QuoteScreen", { state: 0 }) }}>

        <Card style={styles.backButton}>


          <TitleText style={styles.Text}>Cancel</TitleText>


        </Card>

      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({

  confirmButton: {
    //  flex: 1,

    backgroundColor: '#8CC740',
    width: Dimensions.get('window').width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 39,
    shadowOpacity: 0.2,
    borderColor: '#8CC740',
    borderWidth: 1,

  },

  Text: {
    fontFamily: 'Lexend-bold'
  },


  backButton: {
    //  flex: 1,

    backgroundColor: '#ffff',
    width: Dimensions.get('window').width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 39,
    shadowOpacity: 0.2,
    borderColor: '#8CC740',
    borderWidth: 1,

  },

  buttonView2: {


    zIndex: 30,
    position: 'absolute',
    bottom: 30,
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 100,
    height: 48,
    paddingTop: 20,
    flexDirection: 'row'

  },

});

export default ConfirmButton;