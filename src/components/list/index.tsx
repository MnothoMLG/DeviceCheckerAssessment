import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppButton, ListItem, Margin, Padding, Row, Text} from '../';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import SortIcon from '../../assets/icons/sort.svg';
import {
  fetachAllRequest,
  FETCH_MORE_LOADING_KEY,
  loadMoreRequest,
} from '../../store/data/actions';
import {getDataState, getPostsSelector} from '../../store/data/selectors';
import {colors} from '../../theme';
import SortModal from '../../components/sortModal';
import {useLoading} from '../../hooks/useLoadingHook';

const ItemsList = () => {
  const posts = useSelector(getPostsSelector);
  const {after, sort} = useSelector(getDataState);
  const dispatch = useDispatch();
  const [showSort, setShowSort] = useState(false);
  const loadingMore = useLoading(FETCH_MORE_LOADING_KEY);

  useEffect(() => {
    dispatch(fetachAllRequest({sort}));
  }, []);

  return (
    <FlatList
      data={posts}
      ListEmptyComponent={<View />}
      renderItem={({item}) => <ListItem entry={item} />}
      onEndReached={() => {
        dispatch(
          loadMoreRequest({
            sort,
            after,
          }),
        );
      }}
      ListFooterComponent={
        loadingMore ? (
          <Margin style={{alignItems: 'center'}} mb={48} mt={24}>
            <ActivityIndicator />
            <Text>Loading more</Text>
          </Margin>
        ) : null
      }
    />
  );
};

export default ItemsList;
