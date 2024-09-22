import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { showMessage } from "react-native-flash-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker";

import Conversa from "../../model/Conversa";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Avatar from "../../components/avatar/Avatar";
import { generateUUID } from "../../modules/uuid/Uuid";
import { NameScreens, RootStackParamList } from "../../navigation/Navigator";
import ConversaController from "../../repository/controllers/Conversa.controller";

import styles from './FormChat.styles'

export default function FormChat() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const route = useRoute<RouteProp<RootStackParamList, 'FormChat'>>()
    const chat = route.params?.data

    const [name, setName] = useState(chat?.nomeConversa || '')
    const [image, setImage] = useState(chat?.imagemGrupo || '')
    const [description, setDescription] = useState(chat?.descricao || '')
    const [isLoading, setIsLoading] = useState(false)

    function onSubmit() {
        setIsLoading(true)

        if (chat)
            updateChat()
        else
            createNewChat()
    }

    function updateChat() {
        if (!chat) return
        setIsLoading(true)

        const conversa: Conversa = {
            ...chat,
            nomeConversa: name,
            descricao: description,
            imagemGrupo: image,
        }

        ConversaController.updateChat(conversa)
            .then(() => {
                showMessage({
                    message: "Dados alterados com sucesso",
                    type: "success",
                });

                navigation.navigate(NameScreens.Home)
            })
            .catch(err => console.log('Err', err))
            .finally(() => setIsLoading(false))
    }

    function createNewChat() {
        setIsLoading(true)

        const conversa: Conversa = {
            idConversa: generateUUID(6),
            nomeConversa: name,
            descricao: description,
            dataHoraCriacao: new Date(),
            imagemGrupo: image,
            listaUsuario: []
        }

        ConversaController.createChat(conversa)
            .then(() => {
                showMessage({
                    message: "Conversa criada com sucesso",
                    type: "success",
                });
                navigation.goBack()
            })
            .catch(err => console.log('Err', err))
            .finally(() => setIsLoading(false))
    }

    async function onPressChangeImage() {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            selectionLimit: 1
        }

        launchImageLibrary(options)
            .then((res) => {
                if (!res.assets) return

                const path = res.assets[0].uri || ''
                setImage(path)
            });
    }

    return (
        <ScrollView contentContainerStyle={styles.contentScroll}>
            <View>
                <Avatar
                    imageSize={200}
                    source={image}
                    styles={styles.image}
                    onPress={onPressChangeImage} />

                <Input
                    label={'Título'}
                    value={name}
                    placeholder='Título da conversa'
                    onChangeValue={(value) => setName(value)}
                    stylesContainer={styles.inputContainer} />

                <Input
                    label={'Descrição'}
                    value={description}
                    multiline
                    placeholder='Descrição da conversa'
                    onChangeValue={(value) => setDescription(value)}
                    onSubmitEditing={onSubmit}
                    stylesContainer={styles.inputContainer} />
            </View>

            <Button
                isLoading={isLoading}
                text="Salvar"
                onPress={onSubmit}
                styles={styles.buttonContainer} />
        </ScrollView>
    )
}