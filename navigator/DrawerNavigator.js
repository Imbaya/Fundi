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
                    title:"ACCOUNT",
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "account"
                                                         color = {focused?'#7cc':colors.grey2}
                                                         size = {100}
                                                         
                                                          />,  
                     headerShown : false
                     
                }}
            />

<Drawer.Screen
                name = "Wallet"
                component = {HomeStack}
                options = {{
                    title:"Wallet",
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "home"
                                                         color = {focused?'#7cc':colors.grey2}
                                                         size = {size}
                                                         
                                                          />,  
                     headerShown : false
                     
                }}
                onPress ={()=>{navigation.navigate("RequestScreen",{state:0})}}
            />

<Drawer.Screen
                name = "Work History"
                component = {HomeStack}
                options = {{
                    title:"Work History",
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "home"
                                                         color = {focused?'#7cc':colors.grey2}
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
                    title:"Active/Inactive",
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "home"
                                                         color = {focused?'#7cc':colors.grey2}
                                                         size = {size}
                                                         
                                                          />,  
                     headerShown : false
                     
                }}
                onPress ={()=>{navigation.navigate("RequestScreen",{state:0})}}
            />
             
             <Drawer.Screen
                name = "Settings"
                component = {HomeStack}
                options = {{
                    title:"Settings",
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "home"
                                                         color = {focused?'#7cc':colors.grey2}
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
                    title:"Support",
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "home"
                                                         color = {focused?'#7cc':colors.grey2}
                                                         size = {size}
                                                         
                                                          />,  
                     headerShown : false
                     
                }}
                onPress ={()=>{navigation.navigate("RequestScreen",{state:0})}}
            />

<Drawer.Screen
                name = "Invoices"
                component = {HomeStack}
                options = {{
                    title:"Invoices",
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "home"
                                                         color = {focused?'#7cc':colors.grey2}
                                                         size = {size}
                                                         
                                                          />,  
                     headerShown : false
                     
                }}
                onPress ={()=>{navigation.navigate("RequestScreen",{state:0})}}
            />

<Drawer.Screen
                name = "Ratings"
                component = {HomeStack}
                options = {{
                    title:"Ratings",
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "home"
                                                         color = {focused?'#7cc':colors.grey2}
                                                         size = {size}
                                                         
                                                          />,  
                     headerShown : false
                     
                }}
                onPress ={()=>{navigation.navigate("SignUpScreen",{state:0})}}
            />
            <Drawer.Screen
                name = "SignOut"
                component = {HandleSignOut}
                options = {{
                    title:"SignOut",
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "home"
                                                         color = {focused?'#7cc':colors.grey2}
                                                         size = {size}
                                                         
                                                          />,  
                     headerShown : false
                     
                }}
            />

        </Drawer.Navigator>
    )
}