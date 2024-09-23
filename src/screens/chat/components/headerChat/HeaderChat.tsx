import React from "react";
import { Text, TouchableOpacity } from "react-native";

import Avatar from "../../../../components/avatar/Avatar";
import styles from './HeaderChat.styles'

interface HeaderChatProps {
    title: string;
    image?: string;

    onPress?: () => void;
}


export default function HeaderChat({ title, image, onPress }: HeaderChatProps) {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}>

            <Avatar
                imageSize={50}
                source={image} 
                onPress={onPress}/>

            <Text
                style={styles.text}
                numberOfLines={1}
                children={title} />
        </TouchableOpacity>
    )
}