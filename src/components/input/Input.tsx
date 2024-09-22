import { StyleProp, Text, TextInput, TextStyle, View } from "react-native";
import stylesDefault, { placeholderColor } from "./Input.styles";

interface TextInputProps {
    label?: string;
    value?: string;
    multiline?: boolean
    placeholder?: string;
    placeholderTextColor?: string;
    stylesContainer?: StyleProp<TextStyle>;
    stylesLabel?: StyleProp<TextStyle>;
    stylesInput?: StyleProp<TextStyle>;

    onSubmitEditing?: () => void;
    onChangeValue: (value: string) => void;
}


export default function Input(props: TextInputProps) {
    const {
        label,
        value,
        multiline,
        placeholder,
        placeholderTextColor,
        stylesContainer,
        stylesLabel,
        stylesInput,

        onChangeValue,
        onSubmitEditing
    } = props;

    return (
        <View style={stylesContainer}>
            {label && (
                <Text
                    style={[stylesDefault.label, stylesLabel]}
                    children={label}
                />
            )}

            <TextInput
                value={value}
                placeholder={placeholder}
                multiline={multiline}
                onChangeText={onChangeValue}
                onSubmitEditing={onSubmitEditing}
                placeholderTextColor={placeholderTextColor ?? placeholderColor}
                style={[
                    stylesDefault.input,
                    stylesInput,
                    multiline ? stylesDefault.multiline : {}
                ]} />
        </View>
    )
}