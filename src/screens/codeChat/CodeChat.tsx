import React, { useContext, useState } from "react";
import { ScrollView } from "react-native";

import { CvsContext } from "../../../App";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

import styles from './CodeChat.styles'
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

export default function CodeChat() {
    const { createCv } = useContext(CvsContext);
    const navigation = useNavigation();

    const [chatId, setChatId] = useState('')

    function onSubmit() {
        if (chatId) {
            createCv(chatId)
            showMessage({
                message: "Entrou com sucesso",
                type: "success",
            });
            navigation.goBack()
        }
    }


    return (
        <ScrollView contentContainerStyle={styles.contentScroll}>
            <Input
                label={'Código da conversa'}
                value={chatId}
                placeholder='Digite o código da conversa'
                onChangeValue={(value) => setChatId(value)}
                stylesContainer={styles.inputContainer} />

            <Button
                text="Entrar"
                onPress={onSubmit}
                styles={styles.buttonContainer} />
        </ScrollView>
    )
}