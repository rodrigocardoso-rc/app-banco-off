import { useCallback, useContext, useState } from "react";
import { FlatList, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AuthContext } from "../../../App";
import Conversa from "../../model/Conversa";
import CardChat from "./components/cardChat/CardChat";
import FooterHome from "./components/footerHome/FooterHome";
import HeaderHome from "./components/headerHome/HeaderHome";
import { NameScreens, RootStackParamList } from "../../navigation/Navigator";
import ConversaController from "../../repository/controllers/Conversa.controller";

import styles from './Home.styles'

export default function Home() {
    const { loggedUser } = useContext(AuthContext);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const [chatList, setChatList] = useState<Conversa[]>([])

    useFocusEffect(useCallback(getChatList, []))

    function getChatList() {
        ConversaController.getChatList()
            .then((res) => setChatList([...res]))
    }

    function onPressProfile() {
        navigation.navigate(NameScreens.Profile)
    }

    function onPressNewChat() {
        navigation.navigate(NameScreens.FormChat)
    }

    function onPressChat(data: Conversa) {
        navigation.navigate(NameScreens.Chat, { data })
    }

    function renderItem({ item }: { item: Conversa, index: number }) {
        return (
            <CardChat
                title={item.nomeConversa}
                image={item.imagemGrupo}
                onPress={() => onPressChat(item)} />
        )
    }

    return (
        <View style={styles.container}>
            <HeaderHome
                image={loggedUser?.imagemUsuario}
                onPress={onPressProfile}
            />

            <FlatList
                data={chatList}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer} />

            <FooterHome onPress={onPressNewChat} />
        </View>
    )
}