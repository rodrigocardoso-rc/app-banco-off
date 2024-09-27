import Conversa from "../../model/Conversa";
import Mensagem from "../../model/Mensagem";

interface SocketConnectProps {
    ipAddress: string;
    idConversa: string;
    name?: string;
    description?: string;
    dataHoraCriacao?: string;

    onReceiveCvsInfo: (conversa: Conversa) => void;
    onReceiveMessage: (message: Mensagem) => void;
    onClose?: () => void;
}

export default function SocketConnect(props: SocketConnectProps) {
    const {
        ipAddress,
        idConversa,
        name,
        description,
        dataHoraCriacao,

        onReceiveCvsInfo,
        onReceiveMessage,
        onClose
    } = props;
    const nameUrl = name ? `&nome=${encodeURIComponent(name)}` : ''
    const descriptionUrl = description ? `&descricao=${encodeURIComponent(description)}` : ''
    const dataHoraCriacaoUrl = dataHoraCriacao ? `&dataHoraCriacao=${encodeURIComponent(dataHoraCriacao)}` : ''

    const socket = new WebSocket(`ws://${ipAddress}?idConversa=${idConversa}${nameUrl}${descriptionUrl}${dataHoraCriacaoUrl}`);

    socket.onopen = () => {
        console.log('Connected to WebSocket');
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.tipo === 'infoConversa') {
            const { idConversa, nome, descricao, dataHoraCriacao } = data



            console.log(data.dataHoraCriacao)

            const cv: Conversa = {
                idConversa: idConversa,
                nomeConversa: decodeURIComponent(nome),
                descricao: decodeURIComponent(descricao),
                dataHoraCriacao: new Date(parseInt(decodeURIComponent(dataHoraCriacao)))
            }

            onReceiveCvsInfo(cv)
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