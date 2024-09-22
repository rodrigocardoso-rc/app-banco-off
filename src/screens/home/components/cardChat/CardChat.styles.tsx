import { StyleSheet } from "react-native";

import { Dimensions } from "../../../../styles/Dimensions";
import { Colors } from "../../../../styles/Colors";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Dimensions.padding.large,
        gap: Dimensions.gap.large,
    },
    text: {
        fontSize: Dimensions.fontSize.large,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.text
    }
}); 