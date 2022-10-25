import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AppButton,
  ListItem,
  Margin,
  Padding,
  Row,
  Text,
} from '../../components';
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

const Home: React.FC = () => {
  const posts = useSelector(getPostsSelector);
  const {after, sort} = useSelector(getDataState);
  const dispatch = useDispatch();
  const [showSort, setShowSort] = useState(false);
  const loadingMore = useLoading(FETCH_MORE_LOADING_KEY);

  useEffect(() => {
    dispatch(fetachAllRequest({sort}));
  }, []);

  return [
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-end',
        }}
        onPress={() => setShowSort(true)}>
        <Text color={colors.background.secondary}>Sort</Text>
        <SortIcon />
      </TouchableOpacity>
      <Margin mb={24} />
      <Padding style={styles.span}>
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
              <Margin mb={48} mt={24}>
                <ActivityIndicator />
                <Text>Loading more</Text>
              </Margin>
            ) : null
          }
        />
        <Margin mb={12} />
      </Padding>
    </View>,
    <SortModal visible={showSort} close={() => setShowSort(false)} />,
  ];
};

export default Home;
