import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeStack } from './StackNavigator'
import { Icon } from 'react-native-elements'
import { colors } from '../global/styles'
import { auth } from '../Database/config'
import LoginScreen from '../screen/LoginScreen';
import { useNavigation } from '@react-navigation/native';


const Drawer = createDrawerNavigator()

export default function DrawerNavigator(){
    

    const HandleSignOut = () => {
        const navigation = useNavigation(); 

        auth
        .signOut()
        .then(() => {
            navigation.navigate("LoginScreen", { state: 0 });
        })
        .catch(error => alert(error.message))
      }

    return(
        <Drawer.Navigator  useLegacyImplementation={true}>
            <Drawer.Screen
                name = "HomeStack"
                component = {HomeStack}
                options = {{
                  
                    drawerLabel: 'Doe',
                    drawerLabelStyle: {
                     fontSize: 20,
                     color: '#17304A',
                     fontWeight: 'bold',
                     fontFamily: 'Lexend-bold'
                   },
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "account"
                                                         color = "grey"
                                                         size = {80}
                                                         
                                                          />,  
                                                          
                     headerShown : false
                     
                }}
            />

<Drawer.Screen
                name = "Work history"
                component = {HomeStack}
                options = {{
                  
                    drawerLabel: 'Work history',
                    drawerLabelStyle: {
                     fontSize: 15,
                     color: '#17304A',
                     fontWeight: 'bold',
                     fontFamily: 'Lexend-bold'
                   },
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "history"
                                                         color= "#17304A"
                                                         size = {size}
                                                         
                                                          />,  
                     headerShown : false
                     
                }}
                onPress ={()=>{navigation.navigate("RequestScreen",{state:0})}}
            />

<Drawer.Screen
                name = "Active/Inactive"
                component = {HomeStack}
                options = {{
                  
                    drawerLabel: 'Active/Inactive',
                    drawerLabelStyle: {
                     fontSize: 15,
                     color: '#17304A',
                     fontWeight: 'bold',
                     fontFamily: 'Lexend-bold'
                   },
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "nintendo-switch"
                                                         color= "#17304A"
                                                         size = {size}
                                                         
                                                          />,  
                     headerShown : false
                     
                }}
                onPress ={()=>{navigation.navigate("RequestScreen",{state:0})}}
            />



<Drawer.Screen
                name = "Support"
                component = {HomeStack}
                options = {{
                  
                    drawerLabel: 'Support',
                    drawerLabelStyle: {
                     fontSize: 15,
                     color: '#17304A',
                     fontWeight: 'bold',
                     fontFamily: 'Lexend-bold'
                   },
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                    name = "face-agent"
                                                         color= "#17304A"
                                                         size = {size}
                                                         
                                                          />,  
                     headerShown : false
                     
                }}
                onPress ={()=>{navigation.navigate("RequestScreen",{state:0})}}
            />


<Drawer.Screen
                name = "Change password"
                component = {HomeStack}
                options = {{
                  
                    drawerLabel: 'Change password',
                    drawerLabelStyle: {
                     fontSize: 15,
                     color: '#17304A',
                     fontWeight: 'bold',
                     fontFamily: 'Lexend-bold'
                   },
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "wallet"
                                                         color= "#17304A"
                                                         size = {size}
                                                         
                                                          />,  
                     headerShown : false
                     
                }}
                onPress ={()=>{navigation.navigate("RequestScreen",{state:0})}}
            />
         


         <Drawer.Screen
                name = "Logout"
                component = {HomeStack}
                options = {{
                  
                    drawerLabel: 'Logout',
                    drawerLabelStyle: {
                     fontSize: 15,
                     color: '#17304A',
                     fontWeight: 'bold',
                     fontFamily: 'Lexend-bold'
                   },
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                    name = "logout"
                                                         color= "#17304A"
                                                         size = {size}
                                                         
                                                          />,  
                     headerShown : false
                     
                }}
                onPress ={()=>{navigation.navigate("RequestScreen",{state:0})}}
            />


        </Drawer.Navigator>
    )
}