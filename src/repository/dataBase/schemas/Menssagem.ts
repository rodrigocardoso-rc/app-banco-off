import Realm from 'realm';

class Menssagem extends Realm.Object {
    static schema = {
        name: 'Menssagem',
        primaryKey: 'idMenssagem',
        properties: {
            idMenssagem: 'string',            
            idConversa: 'string',
            idUsuario: 'string',
            nomeUsuario: 'string',
            conteudo: 'string',
            dataHora: 'date',
        },
    };
}

export { Menssagem };
