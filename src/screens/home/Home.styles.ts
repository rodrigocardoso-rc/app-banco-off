import { StyleSheet } from "react-native";

import { Dimensions } from "../../styles/Dimensions";
import { Colors } from "../../styles/Colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.screenBackground,
        justifyContent: 'space-between'
    },
    listContainer: {
        paddingVertical: Dimensions.padding.medium,
    }
}); 