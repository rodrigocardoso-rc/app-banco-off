import { Text, TouchableOpacity } from "react-native";

import styles from './HeaderHome.styles'
import Avatar from "../../../../components/avatar/Avatar";

interface HeaderItemProps {
    image?: string;
    onPress: () => void;
}

export default function HeaderItem({ image, onPress }: HeaderItemProps) {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}>
            <Text
                style={styles.text}
                numberOfLines={1}
                children={'IFChat'} />

            <Avatar
                imageSize={45}
                source={image}
                onPress={onPress} />
        </TouchableOpacity>
    )
}