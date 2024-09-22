import { StyleSheet } from "react-native";

import { Dimensions } from "../../../../styles/Dimensions";
import { Colors } from "../../../../styles/Colors";

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: Dimensions.gap.large,
        marginLeft: -20
    },
    text: {
        fontSize: Dimensions.fontSize.large,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.text
    }
}); 