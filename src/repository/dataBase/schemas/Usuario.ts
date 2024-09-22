import Realm from 'realm';

class Usuario extends Realm.Object {
    static schema = {
        name: 'Usuario',
        primaryKey: 'idUsuario',
        properties: {
            idUsuario: 'string',
            nomeUsuario: 'string',
            imagemUsuario: 'string?',

            isLoggedIn: 'bool?',
        },
    };
}

export { Usuario };
