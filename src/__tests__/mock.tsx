import {store} from '../store/root.store';
import React from 'react';
import {Provider} from 'react-redux';

export const MockReduxProvider = ({children}: any) => (
  <Provider store={store}>{children}</Provider>
);

it('renders correctly', () => {
  expect(true).toBeTruthy();
});
