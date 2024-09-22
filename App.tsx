import React, { useState, createContext, useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';

import Navigator from './src/navigation/Navigator';
import { Colors } from './src/styles/Colors';
import { UsuarioAtual } from './src/model/Usuario';
import UsuarioController from './src/repository/controllers/Usuario.controller';

interface IAuthContext {
  loggedUser?: UsuarioAtual,
  onUpdateUser: (() => Promise<void>) | (() => void);
}

export const AuthContext = createContext<IAuthContext>({
  onUpdateUser: () => { }
});

function App(): React.JSX.Element {
  const [loggedUser, setLoggedUser] = useState<UsuarioAtual>();

  useEffect(getLoggedUser, [])

  function getLoggedUser() {
    UsuarioController.getUserLogged()
      .then(res => setLoggedUser(res))
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.screenBackground}
      />

      <AuthContext.Provider value={{ loggedUser, onUpdateUser: getLoggedUser }}>
        <Navigator />
      </AuthContext.Provider>

      <FlashMessage position={'top'} />
    </View>
  );
}

export default App;
