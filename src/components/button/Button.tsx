import { StyleProp, Text, TextStyle, ViewStyle, TouchableOpacity, ActivityIndicator } from "react-native";
import stylesDefault from './Button.styles'

interface ButtonProps {
    text: string;
    isLoading?: boolean;
    styles?: StyleProp<ViewStyle>
    stylesText?: StyleProp<TextStyle>

    onPress: () => void;
}

export default function Button(props: ButtonProps) {
    const { text, isLoading, styles, stylesText, onPress } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[stylesDefault.button, styles]}
            disabled={isLoading}>
            {isLoading ? (
                <ActivityIndicator
                    size={stylesDefault.buttonText.fontSize}
                    color={stylesDefault.buttonText.color} />
            ) : (
                <Text
                    style={[stylesDefault.buttonText, stylesText]}
                    children={text} />
            )}

        </TouchableOpacity>
    )
}