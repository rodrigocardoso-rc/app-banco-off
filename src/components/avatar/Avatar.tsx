import { Image, ImageStyle, StyleProp, TouchableOpacity } from "react-native";
import stylesDefault from './Avatar.styles'

interface AvatarProps {
    source?: string;
    imageSize: number;
    styles?: StyleProp<ImageStyle>;

    onPress?: () => void;
}

export default function Avatar({ source, imageSize, styles, onPress }: AvatarProps) {

    const imageDimension = {
        height: imageSize,
        width: imageSize,
        borderRadius: imageSize / 2,
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <Image
                source={{ uri: (source || 'https://picsum.photos/200') }}
                resizeMode="cover"
                style={[imageDimension, stylesDefault.container, styles]} />
        </TouchableOpacity>
    )
}