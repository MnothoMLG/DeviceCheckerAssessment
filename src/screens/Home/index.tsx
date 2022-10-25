import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Margin, Padding, RedditItemList, Text} from '../../components';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import SortIcon from '../../assets/icons/sort.svg';
import {fetachAllRequest} from '../../store/data/actions';
import {getDataState, getPostsSelector} from '../../store/data/selectors';
import {colors} from '../../theme';
import SortModal from '../../components/sortModal';
import strings from '../../constants/strings';

const Home = () => {
  const posts = useSelector(getPostsSelector);
  const {sort} = useSelector(getDataState);
  const dispatch = useDispatch();
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    dispatch(fetachAllRequest({sort}));
  }, []);

  return [
    <View style={styles.container}>
      <Text bold color={colors.background.bgDark} align="center" size={20}>
        {strings.home.title}
      </Text>
      <TouchableOpacity style={styles.sort} onPress={() => setShowSort(true)}>
        <Text color={colors.background.secondary}>{strings.common.sort}</Text>
        <SortIcon />
      </TouchableOpacity>
      <Margin mb={24} />
      <Padding style={styles.span}>
        <RedditItemList data={posts} />
        <Margin mb={12} />
      </Padding>
    </View>,
    <SortModal visible={showSort} close={() => setShowSort(false)} />,
  ];
};

export default Home;
