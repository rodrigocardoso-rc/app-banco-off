
export default interface Usuario {
    idUsuario: string,
    nomeUsuario: string,
    imagemUsuario?: string,
}

export interface UsuarioAtual extends Usuario {
    isLoggedIn: boolean
}