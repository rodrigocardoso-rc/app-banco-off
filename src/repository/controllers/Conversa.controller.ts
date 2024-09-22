import { UpdateMode } from "realm";
import Conversa from "../../model/Conversa";
import { ESchemas } from "../dataBase/DbConfig";
import DbModule from "../dataBase/DbModule";

function ConversaController() {

    function getChatList() {
        return DbModule.getAll<Conversa[]>(ESchemas.Conversa)
    }

    function createChat(conversa: Conversa) {
        return DbModule.write<Conversa>(conversa, ESchemas.Conversa)
    }

    function updateChat(conversa: Conversa) {
        return DbModule.write<Conversa>(conversa, ESchemas.Conversa, UpdateMode.All)
    }

    return {
        getChatList,
        createChat,
        updateChat,
    }
}

export default ConversaController()