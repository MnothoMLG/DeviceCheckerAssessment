import React from 'react';
import {render} from '@testing-library/react-native';
import {MockReduxProvider} from '../../../__tests__/mock';
import {RedditItemList} from '../List';

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
    data: [
      {
        author: 'Hades-PersephonePlay',
        subreddit: 'aww',
        thumbnail:
          'https://b.thumbs.redditmedia.com/RsnH3bk2k8NtMvbi2ZtHI4lDuA-gduKjybdAsUek7CQ.jpg',
        title: "Don't forget to close your kitchen cabinets (oc)",
      },
    ],
  } as any;

  const MockList = (
    <MockReduxProvider>
      <RedditItemList {...props} />
    </MockReduxProvider>
  );

  beforeEach(() => {
    props = mockProps;
  });

  it('Render empty list', () => {
    props.data = [];
    const {queryByTestId} = render(<RedditItemList {...props} />);
    expect(queryByTestId('loading-more')).toBeDefined();
  });

  it('Render one post', () => {
    const {queryByTestId} = render(MockList);
    expect(queryByTestId('loading-more')).toBeNull();
  });
});
