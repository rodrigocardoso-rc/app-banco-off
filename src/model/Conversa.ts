import Usuario from "./Usuario";

export default interface Conversa {
    idConversa: string,
    nomeConversa: string,
    descricao?: string,
    dataHoraCriacao: Date,
    imagemGrupo?: string,
}