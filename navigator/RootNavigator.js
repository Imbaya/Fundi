import React from "react";
import { NavigationContainer } from "@react-navigation/native";


import { HomeStack } from "./StackNavigator";
export default function RootNavigator() {
    return (
        <NavigationContainer>
            <HomeStack />
        </NavigationContainer>
    )
}