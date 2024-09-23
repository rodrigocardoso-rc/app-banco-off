import Realm from 'realm';

class Conversa extends Realm.Object {
    static schema = {
        name: 'Conversa',
        primaryKey: 'idConversa',
        properties: {
            idConversa: 'string',
            nomeConversa: 'string',
            descricao: 'string?',
            dataHoraCriacao: 'date',
            imagemGrupo: 'string?',
        },
    };
}

export { Conversa };
