import { Text, TouchableOpacity, View } from "react-native";
import styles from './FooterHome.styles'

interface FooterHomeProps {
    onPressNewChat: () => void;
    onPressJoinChat: () => void;
}

export default function FooterHome({ onPressNewChat, onPressJoinChat }: FooterHomeProps) {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.containerButton} onPress={onPressJoinChat}>
                <Text style={styles.text}>Entrar em grupo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerButton} onPress={onPressNewChat}>
                <Text style={styles.text}>Criar novo grupo</Text>
            </TouchableOpacity>
        </View>
    )
}