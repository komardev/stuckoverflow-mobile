import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { Root } from "native-base";
import Navigation from './src/navigation/Navigation'
import Toast from 'react-native-toast-message';


// Redux Conf
import { Provider } from 'react-redux';
import { store } from './src/config/redux';

const App = () => {
  return (
    <Provider store={store}>
      <Root>
        <Navigation />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </Root>
    </Provider>
  );
}
export default App

