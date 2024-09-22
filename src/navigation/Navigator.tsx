import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContext } from "../../App";
import Conversa from "../model/Conversa";
import Home from "../screens/home/Home";
import Chat from "../screens/chat/Chat";
import Profile from "../screens/profile/Profile";
import FormChat from "../screens/formChat/FormChat";
import HeaderChat from "../screens/chat/components/headerChat/HeaderChat";

export type RootStackParamList = {
    Home: undefined,
    Profile: undefined,
    StartLogin: {},
    Chat: { data: Conversa };
    FormChat: { data?: Conversa } | undefined;
};

export enum NameScreens {
    Home = 'Home',
    Profile = 'Profile',
    StartLogin = 'StartLogin',
    Chat = 'Chat',
    FormChat = 'FormChat'
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
    const { loggedUser } = useContext(AuthContext);

    const LoggedNavigator = (
        <Stack.Navigator initialRouteName={NameScreens.Home}>
            <Stack.Screen
                name={NameScreens.Home}
                options={{ title: "Home", headerShown: false }}
                component={Home} />

            <Stack.Screen
                name={NameScreens.Profile}
                options={{ title: "Perfil" }}
                component={Profile} />

            <Stack.Screen
                name={NameScreens.FormChat}
                options={{ title: "Conversa" }}
                component={FormChat} />

            <Stack.Screen
                name={NameScreens.Chat}
                options={{ headerTitle: () => (<HeaderChat title={'Conversa'} />) }}
                component={Chat} />
        </Stack.Navigator>
    )

    const NotLoggedNavigator = (
        <Stack.Navigator>
            <Stack.Screen
                name={NameScreens.StartLogin}
                options={{ title: "Perfil" }}
                component={Profile} />
        </Stack.Navigator>
    )

    return (
        <NavigationContainer>
            {!!loggedUser
                ? LoggedNavigator
                : NotLoggedNavigator}
        </NavigationContainer>
    )
}