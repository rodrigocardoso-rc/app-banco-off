import { Text, TouchableOpacity } from "react-native";

import Avatar from "../../../../components/avatar/Avatar";
import styles from './CardChat.styles'

interface CardChatProps {
    title: string;
    image?: string;

    onPress: () => void;
}

export default function CardChat({ title, image, onPress }: CardChatProps) {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}>
            <Avatar
                imageSize={50}
                source={image}
                onPress={onPress}
            />

            <Text
                style={styles.text}
                numberOfLines={1}
                children={title} />
        </TouchableOpacity>
    )
}