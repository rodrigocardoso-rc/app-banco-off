import Conversa from "../../model/Conversa";
import Mensagem from "../../model/Mensagem";

interface SocketConnectProps {
    idConversa: string;

    onReceiveCvsInfo: (conversa: Conversa) => void;
    onReceiveMessage: (message: Mensagem) => void;
    onClose?: () => void;
}

export default function SocketConnect(props: SocketConnectProps) {
    const {
        idConversa,

        onReceiveCvsInfo,
        onReceiveMessage,
        onClose
    } = props;
    const socket = new WebSocket(`ws://192.168.1.6:8080?idConversa=${idConversa}`);

    socket.onopen = () => {
        console.log('Connected to WebSocket');
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.tipo === 'infoConversa') {
            // Exibir informações da conversa
            console.log('Nome da conversa:', data.nome);
            console.log('Imagem da conversa:', data.imagem);

            onReceiveCvsInfo({ idConversa: idConversa, ...data })
        } else {
            onReceiveMessage(data)
        }
    };

    socket.onclose = () => {
        console.log('Disconnected from WebSocket');

        if (onClose)
            onClose();
    };

    function sendMessage(msg: Mensagem) {
        socket.send(JSON.stringify(msg));
    }

    return sendMessage
}