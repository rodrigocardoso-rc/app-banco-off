import { StyleSheet } from "react-native";

import { Colors } from "../../styles/Colors";
import { Dimensions } from "../../styles/Dimensions";

export default StyleSheet.create({
    button: {
        padding: Dimensions.padding.medium,
        backgroundColor: Colors.button,
        borderRadius: Dimensions.borderRadius.medium,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: Colors.textButton,
        fontSize: Dimensions.fontSize.medium,
        fontWeight: 'bold',
    }
});