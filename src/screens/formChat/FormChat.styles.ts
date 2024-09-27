import { StyleSheet } from "react-native";

import { Dimensions } from "../../styles/Dimensions";
import { Colors } from "../../styles/Colors";

export default StyleSheet.create({
    contentScroll: {
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingHorizontal: Dimensions.padding.large,
    },
    inputContainer: {
        marginTop: Dimensions.margin.medium,
    },
    image: {
        alignSelf: 'center',
        marginTop: Dimensions.margin.large,
    },
    buttonContainer: {
        marginVertical: Dimensions.margin.large
    },
    deleteChatContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: Dimensions.margin.medium
    },
    deleteChatText: {
        fontSize: Dimensions.fontSize.medium,
        color: Colors.placeholder
    }, containerCode: {
        justifyContent: 'center',
        alignItems: 'center'
    }, textCode: {
        color: Colors.text
    }
});