import React from 'react';
import {render} from '@testing-library/react-native';
import {MockReduxProvider} from '../../../__tests__/mock';
import {ListItem} from '../../';

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

describe('#RedditList', () => {
  let props = {
    entry: {
      data: {
        author: 'Hades-PersephonePlay',
        subreddit: 'aww',
        thumbnail:
          'https://b.thumbs.redditmedia.com/RsnH3bk2k8NtMvbi2ZtHI4lDuA-gduKjybdAsUek7CQ.jpg',
        title: "Don't forget to close your kitchen cabinets (oc)",
      },
    },
    onPress: () => {},
  } as any;

  const MockItem = (
    <MockReduxProvider>
      <ListItem {...props} />
    </MockReduxProvider>
  );

  beforeEach(() => {
    props = mockProps;
  });

  it('Render entry with no thumbnail', () => {
    props.data = [];
    const {queryByTestId} = render(<ListItem {...props} />);
    const thumbnail = queryByTestId('thumbnail');
    console.log('thumbnail props ====>', thumbnail?.props);
    expect(queryByTestId('thumbnail')?.props).toBeTruthy();
  });
  it('Render normal  post', () => {
    const {queryByTestId} = render(MockItem);
    expect(queryByTestId('loading-more')).toBeNull();
  });
});
