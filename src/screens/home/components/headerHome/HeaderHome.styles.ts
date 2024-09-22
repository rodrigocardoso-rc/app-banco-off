import { StyleSheet } from "react-native";

import { Dimensions } from "../../../../styles/Dimensions";
import { Colors } from "../../../../styles/Colors";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: Dimensions.gap.large,
        paddingVertical: Dimensions.padding.medium,
        paddingHorizontal: Dimensions.padding.large,
        borderBottomWidth: Dimensions.borderWidth.large,
        borderColor: Colors.border,
    },
    image: {
        height: 45,
        width: 45,
        borderWidth: 2,
        borderColor: Colors.border,
        borderRadius: 25,
    },
    text: {
        fontSize: Dimensions.fontSize.large,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.text
    }
}); 