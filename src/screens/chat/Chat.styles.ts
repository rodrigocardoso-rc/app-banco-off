import { StyleSheet } from "react-native";

import { Colors } from "../../styles/Colors";
import { Dimensions } from "../../styles/Dimensions";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.screenBackground,
        justifyContent: 'space-between'
    },
    containerStyle: {
        gap: Dimensions.gap.large,
        paddingHorizontal: Dimensions.padding.large,
        paddingVertical: Dimensions.padding.large
    },
    containerInput: {
        gap: Dimensions.gap.small,
        flexDirection: 'row',
        padding: Dimensions.padding.medium
    },
    containerSendImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendImage: {
        height: 40,
        width: 40,
    }
});