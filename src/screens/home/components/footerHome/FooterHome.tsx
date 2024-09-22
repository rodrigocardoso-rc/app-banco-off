import { Text, TouchableOpacity } from "react-native";
import styles from './FooterHome.styles'

interface FooterHomeProps {
    onPress: () => void;
}

export default function FooterHome({ onPress }: FooterHomeProps) {

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>Novo grupo</Text>
        </TouchableOpacity>
    )
}