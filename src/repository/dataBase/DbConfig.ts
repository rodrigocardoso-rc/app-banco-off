import { Conversa } from "./schemas/Conversa";
import { Menssagem } from "./schemas/Menssagem";
import { Usuario } from "./schemas/Usuario";

const DB_PATH = 'banco.realm';
const SCHEMA_VERSION = 1;

export const dbConfig: Realm.Configuration = {
  path: DB_PATH,
  schemaVersion: SCHEMA_VERSION,
  schema: [Usuario, Conversa, Menssagem],
  // onMigration: runMigrations,
};

export enum ESchemas {
  Usuario = 'Usuario',
  Conversa = 'Conversa',
  Menssagem = 'Menssagem',
}
