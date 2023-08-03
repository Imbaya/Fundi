import React from 'react';
import { View, StyleSheet, Image, ImageBackground, FlatList, Text } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import { SERVICES } from '../data/services';
import Services from '../components/Services';
import { Icon } from 'react-native-elements';
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText';

const RequestScreen = ({ navigation }) => {

    

    const renderGridItem = itemData => {
        return (
            ////COMPONENT IMPORTED TO RENDER FLATLIST ITEMS//////
            <Services
                name={itemData.item.name}

                image={itemData.item.image}
                onSelect={() => { navigation.navigate("DescriptionScreen", { state: 0 }) }}


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
                    onPress={() => { navigation.navigate("RequestScreen", { state: 0 }) }}
                />





            </View>

            <View style={styles.userIcon}>
                <Icon
                    type="material-community"
                    name="account"
                    //color = {colors.grey1}
                    size={35}
                    onPress={() => { navigation.navigate("RequestScreen", { state: 0 }) }}
                />





            </View>
            <ImageBackground
                source={require('../assets/4k-background.png')}
                resizeMode="cover"
                style={styles.imageBackground}
            >

                <View style={styles.gridView}>

                    <View style={styles.logo}>
                        <Image
                            source={require('../assets/logo.png')}
                            style={styles.image}
                        // resizeMode="cover" 
                        />

                    </View>

                    <Card style={styles.card}>
                        <View style={styles.textView}>
                            <TitleText style={styles.Text}># Digitized construction</TitleText>

                        </View>
                        <View style={styles.flatlist}>
                            <FlatList
                                keyExtractor={(item, index) => item.id}
                                data={SERVICES}
                                renderItem={renderGridItem}
                                numColumns={2}
                            />

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
        justifyContent: 'space-around'
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


    flatlist: {
        paddingTop: 10,
        backgroundColor: 'transparent'
    },

    card: {
        flex: 1,
        backgroundColor: '#F5F2F0',

        width: Dimensions.get('window').width * 1,
        justifyContent: 'center',
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
        height: Dimensions.get('window').height * 0.95,

    },

    buttonText: {
        fontWeight: 'bold',

    },
 


});

export default RequestScreen;