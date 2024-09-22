import { useContext, useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NameScreens, RootStackParamList } from "../../navigation/Navigator";

import { AuthContext } from "../../../App";
import Mensagem from "../../model/Mensagem";
import { generateUUID } from "../../modules/uuid/Uuid";
import Message from "./components/message/Message";
import HeaderChat from "./components/headerChat/HeaderChat";
import MessageInput from "./components/messageInput/MessageInput";
import MensagemController from "../../repository/controllers/Mensagem.controller";

import styles from './Chat.styles'

export default function Chat() {
    const { loggedUser } = useContext(AuthContext);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const route = useRoute<RouteProp<RootStackParamList, 'Chat'>>()
    const chat = route.params.data

    const [inputValue, setInputValue] = useState('')
    const [messageList, setMessageList] = useState<Mensagem[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(getMessageList, [])

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <HeaderChat
                    title={chat.nomeConversa}
                    image={chat.imagemGrupo}
                    onPress={onPressChatDetail} />
            ),
        })
    })

    function getMessageList() {
        MensagemController.getMessageByChat(chat.idConversa)
            .then((res) => setMessageList(res.reverse()))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }

    function onPressSend() {
        if (!loggedUser) return

        const userLog = {
            idUsuario: loggedUser.idUsuario,
            nomeUsuario: loggedUser.nomeUsuario,
        }

        const newUserId = generateUUID(6)
        const otherUser = {
            idUsuario: newUserId,
            nomeUsuario: newUserId,
        }

        const newMessage: Mensagem = {
            ...userLog,
            idMenssagem: generateUUID(6),
            idConversa: chat.idConversa,
            conteudo: inputValue,
            dataHora: new Date()
        }

        setIsLoading(true)

        MensagemController.sendMessage(newMessage)
            .then(() => {
                setMessageList([newMessage, ...messageList])
                setInputValue('')
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }

    function onPressChatDetail() {
        navigation.navigate(NameScreens.FormChat, { data: chat })
    }

    function renderItem({ item }: { item: Mensagem, index: number }) {
        return (
            <Message
                author={item.nomeUsuario}
                content={item.conteudo}
                dataHoraEnvio={item.dataHora}
                isUserMessage={loggedUser?.idUsuario === item.idUsuario} />
        )
    }

    return (
        <View style={styles.container}>

            <FlatList
                inverted
                data={messageList}
                renderItem={renderItem}
                contentContainerStyle={styles.containerStyle}
            />

            <View style={styles.containerInput}>
                <MessageInput
                    value={inputValue}
                    placeholder={"Enviar mensagem..."}
                    onChangeValue={(value) => setInputValue(value)}
                    onSubmitEditing={onPressSend} />


                <TouchableOpacity
                    style={styles.containerSendImage}
                    onPress={onPressSend}>
                    <Image
                        style={styles.sendImage}
                        resizeMode="stretch"
                        source={require('../../assets/sendImage.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}