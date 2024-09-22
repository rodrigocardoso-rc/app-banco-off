import React, { useContext, useState } from "react";
import { View, ScrollView } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker";

import { AuthContext } from "../../../App";
import Usuario, { UsuarioAtual } from "../../model/Usuario";
import { generateUUID } from "../../modules/uuid/Uuid";
import Input from "../../components/input/Input";
import Avatar from "../../components/avatar/Avatar";
import Button from "../../components/button/Button";
import { NameScreens, RootStackParamList } from "../../navigation/Navigator";
import UsuarioController from "../../repository/controllers/Usuario.controller";

import styles from './Profile.styles'

export default function Profile() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const { loggedUser, onUpdateUser } = useContext(AuthContext);

    const [name, setName] = useState(loggedUser?.nomeUsuario || '')
    const [image, setImage] = useState(loggedUser?.imagemUsuario || '')
    const [isLoading, setIsLoading] = useState(false)

    function onSubmit() {
        setIsLoading(true)

        if (loggedUser)
            updateUser()
        else
            createNewUser()
    }

    function updateUser() {
        if (!loggedUser) return
        setIsLoading(true)

        const user: UsuarioAtual = {
            ...loggedUser,
            nomeUsuario: name,
            imagemUsuario: image
        }

        UsuarioController.updateLoggedUser(user)
            .then(async () => {
                showMessage({
                    message: "Dados alterados com sucesso",
                    type: "success",
                });
                await onUpdateUser()
                navigation.navigate(NameScreens.Home)

            })
            .finally(() => setIsLoading(false))
    }

    function createNewUser() {
        setIsLoading(true)

        const user: Usuario = {
            idUsuario: generateUUID(6),
            nomeUsuario: name,
            imagemUsuario: image
        }

        UsuarioController.createLoggedUser(user)
            .then(async () => {
                showMessage({
                    message: "Login realizado com sucesso",
                    type: "success",
                });
                await onUpdateUser()
                navigation.navigate(NameScreens.Home)
            })
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
                    label={'Nome'}
                    value={name}
                    placeholder='Qual seu nome completo ?'
                    onChangeValue={(value) => setName(value)}
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