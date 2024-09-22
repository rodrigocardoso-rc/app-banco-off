import { StyleProp, Text, TextInput, TextStyle, View } from "react-native";
import stylesDefault, { placeholderColor } from "./MessageInput.styles";

interface TextInputProps {
    value?: string;
    placeholder?: string;

    onSubmitEditing?: () => void;
    onChangeValue: (value: string) => void;
}


export default function MessageInput(props: TextInputProps) {
    const {
        value,
        placeholder,

        onChangeValue,
        onSubmitEditing
    } = props;

    return (
        <TextInput
            value={value}
            placeholder={placeholder}
            onChangeText={onChangeValue}
            onSubmitEditing={onSubmitEditing}
            placeholderTextColor={placeholderColor}
            style={stylesDefault.input} />
    )
}