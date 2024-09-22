import { ESchemas } from "../dataBase/DbConfig";
import DbModule from "../dataBase/DbModule";
import Mensagem from "../../model/Mensagem";

function MensagemController() {

    function sendMessage(message: Mensagem) {
        return DbModule.write<Mensagem>(message, ESchemas.Menssagem)
    }

    function getMessageByChat(idChat: string) {
        const query = `idConversa == "${idChat}"`
        return DbModule.getByQuery<Mensagem[]>(query, ESchemas.Menssagem)
    }

    return {
        sendMessage,
        getMessageByChat,
    }
}

export default MensagemController()