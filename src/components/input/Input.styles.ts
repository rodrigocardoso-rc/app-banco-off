import { StyleSheet } from "react-native";
import { Colors } from "../../styles/Colors";
import { Dimensions } from "../../styles/Dimensions";

export const placeholderColor = Colors.placeholder

export default StyleSheet.create({
    label: {
        color: Colors.text,
        fontSize: Dimensions.fontSize.medium,
        fontWeight: 'bold'
    },
    input: {
        width: '100%',
        borderColor: Colors.border,
        borderWidth: 3,
        borderRadius: Dimensions.borderRadius.medium,
        paddingLeft: Dimensions.padding.medium,
        color: Colors.text,
        fontSize: Dimensions.fontSize.small
    },
    multiline: {
        paddingTop: 14,
        textAlignVertical: 'top',
        height: 200,
    }
});