import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';
import Navigation from './src/screens/Navigation';

const store = createStore(reducers);

export default function App() {

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
