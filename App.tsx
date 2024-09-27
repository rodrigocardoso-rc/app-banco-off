import React, { useState, createContext, useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';

import Navigator from './src/navigation/Navigator';
import { Colors } from './src/styles/Colors';
import { UsuarioAtual } from './src/model/Usuario';
import UsuarioController from './src/repository/controllers/Usuario.controller';
import Mensagem from './src/model/Mensagem';
import ConversaController from './src/repository/controllers/Conversa.controller';
import SocketConnect from './src/modules/socket/Socket';
import Conversa from './src/model/Conversa';
import MensagemController from './src/repository/controllers/Mensagem.controller';


type SocketMessage = (msg: Mensagem) => void
type CvsKeValue = {
  [key: string]: {
    hasToUpdate?: boolean
    send: SocketMessage
  }
}

interface IAuthContext {
  loggedUser?: UsuarioAtual,
  onUpdateUser: (() => Promise<void>) | (() => void);
}

interface ICvsContext {
  cvConnection: CvsKeValue;
  hasToUpdateChatList: boolean;
  onUpdate: (idCv: string) => void;
  onUpdateChatList: () => void;
  createCv: (idCv: string, name?: string, description?: string, dataHoraCriacao?: string) => void;
}

export const AuthContext = createContext<IAuthContext>({
  onUpdateUser: () => { },
});

export const CvsContext = createContext<ICvsContext>({
  cvConnection: {},
  hasToUpdateChatList: false,
  onUpdateChatList: () => { },
  onUpdate: () => { },
  createCv: () => { }
});

function App(): React.JSX.Element {
  const [loggedUser, setLoggedUser] = useState<UsuarioAtual>();
  const [cvKeyValue, setCvKeyValue] = useState<CvsKeValue>({});
  const [hasToUpdateChatList, setHasToUpdateChatList] = useState(false)
  const [ipAddress, setIpAddress] = useState('192.168.1.9:8080');

  useEffect(() => {
    getLoggedUser();
    getSocketKeyValues()
  }, [])

  function getLoggedUser() {
    UsuarioController.getUserLogged()
      .then(res => setLoggedUser(res))
  }

  function getSocketKeyValues() {
    ConversaController.getChatList()
      .then(res => {
        const cvsKeyValues: CvsKeValue = {}

        res.forEach(item => {
          cvsKeyValues[item.idConversa] = {
            hasToUpdate: true,
            send: SocketConnect({
              idConversa: item.idConversa,
              ipAddress: ipAddress,
              onReceiveCvsInfo: onReceiveCvsInfo,
              onReceiveMessage: onReceiveMessage
            })
          }
        });

        setCvKeyValue(cvsKeyValues)
      })
  }

  function onReceiveCvsInfo(cv: Conversa) {
    console.log('onReceiveCvsInfo')
    ConversaController.createChat(cv)
      .then(() => {
        setHasToUpdateChatList(true)
      })
  }

  async function onReceiveMessage(message: Mensagem) {
    await MensagemController.sendMessage(message)

    setCvKeyValue((value) => {
      value[message.idConversa].hasToUpdate = true
      return { ...value }
    })
  }

  function createCv(idCv: string, name?: string, description?: string, dataHoraCriacao?: string) {
    cvKeyValue[idCv] = {
      hasToUpdate: false,
      send: SocketConnect({
        idConversa: idCv,
        ipAddress: ipAddress,
        name: name,
        description: description,
        dataHoraCriacao: dataHoraCriacao,

        onReceiveCvsInfo: onReceiveCvsInfo,
        onReceiveMessage: onReceiveMessage
      })
    }

    setCvKeyValue(cvKeyValue)
  }

  function onUpdate(idConversa: string) {
    cvKeyValue[idConversa].hasToUpdate = false
    setCvKeyValue(cvKeyValue)
  }

  function onUpdateChatList() {
    setHasToUpdateChatList(false)
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.screenBackground}
      />

      <CvsContext.Provider value={{
        onUpdate,
        createCv,
        onUpdateChatList,
        hasToUpdateChatList,
        cvConnection: cvKeyValue,
      }}>
        <AuthContext.Provider value={{ loggedUser, onUpdateUser: getLoggedUser }}>
          <Navigator />
        </AuthContext.Provider>
      </CvsContext.Provider>

      <FlashMessage position={'top'} />
    </View >
  );
}

export default App;
