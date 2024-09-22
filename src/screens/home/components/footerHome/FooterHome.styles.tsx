import { StyleSheet } from "react-native";

import { Colors } from "../../../../styles/Colors";
import { Dimensions } from "../../../../styles/Dimensions";

export default StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: Colors.border,
        paddingVertical: Dimensions.padding.large,
    },
    text: {
        fontSize: Dimensions.fontSize.large,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.textButton
    }
}); 