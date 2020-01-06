import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/reducer';
import Screen from './src/Screen';

export default function App() {
  return (
    <Provider store={store}>
      <Screen />
    </Provider>
  );
}
