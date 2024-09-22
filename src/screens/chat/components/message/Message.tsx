import { Text, TouchableOpacity } from "react-native";
import styles from './Message.styles'

interface MessageProps {
    author: string;
    content: string;
    dataHoraEnvio: Date;
    isUserMessage?: boolean;

    onLongPress?: () => void;
}

export default function Message(props: MessageProps) {
    const {
        author,
        content,
        dataHoraEnvio,
        isUserMessage,
        onLongPress
    } = props;

    const alignment = isUserMessage
        ? styles.userMessage
        : styles.theirMessage

    function formattedDate() {
        const day = formatTwoDigit(dataHoraEnvio.getDate());
        const month = formatTwoDigit(dataHoraEnvio.getMonth());
        const year = dataHoraEnvio.getFullYear().toString().slice(2, 4);
        const hour = formatTwoDigit(dataHoraEnvio.getHours());
        const minute = formatTwoDigit(dataHoraEnvio.getMinutes());

        return ` ${hour}:${minute} - ${day}/${month}/${year}`
    }

    function formatTwoDigit(num: number) {
        return num.toString().padStart(2, '0')
    }

    return (
        <TouchableOpacity
            onLongPress={onLongPress}
            style={[styles.container, alignment]}>
            <Text
                style={styles.author}
                children={author}
                numberOfLines={1} />

            <Text
                style={styles.content}
                children={content} />

            <Text
                style={styles.dateTime}
                children={formattedDate()}
                numberOfLines={1} />
        </TouchableOpacity>
    )
}