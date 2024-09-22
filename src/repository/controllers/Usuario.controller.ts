import { UpdateMode } from "realm";
import Usuario, { UsuarioAtual } from "../../model/Usuario";
import { ESchemas } from "../dataBase/DbConfig";
import DbModule from "../dataBase/DbModule";

function UsuarioController() {
    function createUser(user: Usuario) {
        return DbModule.write<Usuario>(user, ESchemas.Usuario)
    }

    function updateLoggedUser(user: Usuario) {
        return DbModule.write<Usuario>(user, ESchemas.Usuario, UpdateMode.All)
    }

    function createLoggedUser(user: Usuario) {
        const newLoggedUser: UsuarioAtual = { ...user, isLoggedIn: true };
        return DbModule.write<Usuario>(newLoggedUser, ESchemas.Usuario)
    }

    async function getUserLogged() {
        const query = 'isLoggedIn == true'
        const userList = await DbModule.getByQuery<UsuarioAtual[]>(query, ESchemas.Usuario)

        return userList[0]
    }

    return {
        createUser,
        createLoggedUser,
        updateLoggedUser,
        getUserLogged
    }
}

export default UsuarioController()