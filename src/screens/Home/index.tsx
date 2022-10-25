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
import {setAndShowFeedback} from '../../store/alert/actions';

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
          renderItem={({item}) => (
            <ListItem
              onPress={() => {
                dispatch(
                  setAndShowFeedback({
                    title: 'View Post',
                    message:
                      'Do you wish to view this post in app or using your phone browser ? ',
                    left: {label: 'Open browser', onPress: () => {}},
                    right: {
                      label: 'Stay in app',
                      onPress: () => {},
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
          ListFooterComponent={
            loadingMore ? (
              <Margin style={{alignItems: 'center'}} mb={68} mt={24}>
                <ActivityIndicator />
                <Text mt={4} color={colors.background.bgDark}>
                  Loading more
                </Text>
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
