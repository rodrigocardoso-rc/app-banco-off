import { StyleSheet } from "react-native";

import { Dimensions } from "../../../../styles/Dimensions";
import { Colors } from "../../../../styles/Colors";

export const placeholderColor = Colors.placeholder

export default StyleSheet.create({
    input: {
        flex: 1,
        borderColor: Colors.inputBorderMessage,
        borderWidth: 3,
        borderRadius: Dimensions.borderRadius.large,
        paddingLeft: Dimensions.padding.medium,
        color: Colors.text,
        fontSize: Dimensions.fontSize.small
    }
});