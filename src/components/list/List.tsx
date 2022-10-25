import React, {useState} from 'react';
import {FlatList, Linking, View} from 'react-native';
import {ListItem} from '..';
import {useDispatch, useSelector} from 'react-redux';
import {
  FETCH_MORE_LOADING_KEY,
  loadMoreRequest,
} from '../../store/data/actions';
import {getDataState} from '../../store/data/selectors';
import {useLoading} from '../../hooks/useLoadingHook';
import {setAndShowFeedback} from '../../store/alert/actions';
import {openURL} from '../../utils/helpers';
import LoadingMore from '../loader/LoadingMore';
import {IEntry, IRedditPost} from '../../store/data/types';
import strings from '../../constants/strings';

interface Props {
  data: IEntry<IRedditPost, string>[];
}

export const RedditItemList = ({data}: Props) => {
  const {after, sort} = useSelector(getDataState);
  const {
    alert: {title, message, left, right},
  } = strings;
  const dispatch = useDispatch();
  const [] = useState(false);
  const loadingMore = useLoading(FETCH_MORE_LOADING_KEY);

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<View />}
      renderItem={({item}) => (
        <ListItem
          onPress={() => {
            /*  pop up is bad UX, but since I couldn't figure out how to best display
          the reddit post, I did this. I could've created a separate screen for the post
          but the instruction said "original reddit post"
          */
            dispatch(
              setAndShowFeedback({
                title,
                message,
                left: {
                  ...left,
                  onPress: () => {
                    Linking.openURL(item.data.url);
                  },
                },
                right: {
                  ...right,
                  onPress: () => {
                    openURL(item.data.url);
                  },
                },
                variant: 'success',
                visible: true,
              }),
            );
          }}
          entry={item}
        />
      )}
      onEndReached={() => {
        dispatch(
          loadMoreRequest({
            sort,
            after,
          }),
        );
      }}
      ListFooterComponent={loadingMore ? <LoadingMore /> : null}
    />
  );
};

export default RedditItemList;
