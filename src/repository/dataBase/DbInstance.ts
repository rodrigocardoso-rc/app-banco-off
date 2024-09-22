import Realm from 'realm';
import { dbConfig } from './DbConfig';

const RealmInstance = new Realm(dbConfig);

export default RealmInstance;
