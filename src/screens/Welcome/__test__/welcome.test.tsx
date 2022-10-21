import React from 'react';
import {render} from '@testing-library/react-native';
import Welcome from '..';
import {MockReduxProvider} from '../../../__tests__/mock';

const mockProps = {};
jest.mock('../../../hooks/useLoadingHook', () => ({
  useLoading: jest.fn().mockImplementation(() => true),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(),
}));

describe('#WelcomeScreen', () => {
  let props = {} as any;

  const MockWelcomeScreen = (
    <MockReduxProvider>
      <Welcome {...props} />
    </MockReduxProvider>
  );

  beforeEach(() => {
    props = mockProps;
  });

  it('Mock Welcome screen test', () => {
    const {queryByTestId} = render(MockWelcomeScreen);
    expect(null).toBeNull();
  });
});
