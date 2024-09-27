import { StyleSheet } from "react-native";

import { Dimensions } from "../../styles/Dimensions";

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
        marginTop: Dimensions.margin.large,
        alignSelf: 'center',
    },
    buttonContainer: {
        marginVertical: Dimensions.margin.large
    }
});