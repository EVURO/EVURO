import { store } from '@evuro-frontend/store';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from '../router';
import BrainBox from '../layout/BrainBox';
import React from 'react';

export function App() {
  return (
    <Provider store={store}>
      <BrainBox>
        <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
      </BrainBox>
    </Provider>
  );
}

export default App;
