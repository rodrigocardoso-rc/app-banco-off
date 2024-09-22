import { StyleSheet } from "react-native";

import { Colors } from "../../../../styles/Colors";
import { Dimensions } from "../../../../styles/Dimensions";

export default StyleSheet.create({
    container: {
        maxWidth: '80%',
        width: '100%',
        padding: Dimensions.padding.medium,
        borderRadius: Dimensions.borderRadius.large
    },
    author: {
        color: Colors.text,
        fontSize: Dimensions.fontSizeMessage.author,
        fontWeight: 'bold'
    },
    content: {
        color: Colors.text,
        fontSize: Dimensions.fontSizeMessage.content
    },
    dateTime: {
        color: Colors.text,
        marginTop: Dimensions.margin.small,
        fontSize: Dimensions.fontSizeMessage.date,
        textAlign: 'right',
        fontWeight: 'bold'
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: Colors.myMessage,
    },
    theirMessage: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.theirMessage,
    }
});