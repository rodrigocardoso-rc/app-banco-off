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
  onUpdate: (idCv: string) => void;
  createCv: (cv: Conversa) => void;
}

export const AuthContext = createContext<IAuthContext>({
  onUpdateUser: () => { },
});

export const CvsContext = createContext<ICvsContext>({
  cvConnection: {},
  onUpdate: () => { },
  createCv: () => { }
});

function App(): React.JSX.Element {
  const [loggedUser, setLoggedUser] = useState<UsuarioAtual>();
  const [cvKeyValue, setCvKeyValue] = useState<CvsKeValue>({});

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
              onReceiveCvsInfo: onReceiveCvsInfo,
              onReceiveMessage: onReceiveMessage
            })
          }
        });

        setCvKeyValue(cvsKeyValues)
      })
  }

  function onReceiveCvsInfo(cv: Conversa) {
    createCv(cv)
  }

  async function onReceiveMessage(message: Mensagem) {
    await MensagemController.sendMessage(message)

    setCvKeyValue((value) => {
      value[message.idConversa].hasToUpdate = true
      return {...value}
    })
  }

  function createCv(cv: Conversa) {
    cvKeyValue[cv.idConversa] = {
      hasToUpdate: false,
      send: SocketConnect({
        idConversa: cv.idConversa,
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

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.screenBackground}
      />

      <CvsContext.Provider value={{ onUpdate, cvConnection: cvKeyValue, createCv }}>
        <AuthContext.Provider value={{ loggedUser, onUpdateUser: getLoggedUser }}>
          <Navigator />
        </AuthContext.Provider>
      </CvsContext.Provider>

      <FlashMessage position={'top'} />
    </View >
  );
}

export default App;
