import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from '../navigation';
import { Provider } from 'react-redux';
import { store } from '@evuro-frontend/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BrainBox from '../components/base/BrainBox';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <BrainBox>
            <Routes />
          </BrainBox>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
