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

    async function deleteChat(idChat: string) {
        const query = `idConversa == "${idChat}"`
        return DbModule.deleteItem(query, ESchemas.Conversa)
    }

    async function deleteChatAndMessages(idChat: string) {
        const queryMessages = `idConversa == "${idChat}"`
        await DbModule.deleteItem(queryMessages, ESchemas.Menssagem)

        const query = `idConversa == "${idChat}"`
        return DbModule.deleteItem(query, ESchemas.Conversa)
    }

    return {
        getChatList,
        createChat,
        updateChat,
        deleteChat,
        deleteChatAndMessages
    }
}

export default ConversaController()