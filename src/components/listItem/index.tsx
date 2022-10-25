import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Padding} from '../layout/layout';
import {Text} from '../text';
import {CardButton, Thumbnail} from './styles';
import * as Animatable from 'react-native-animatable';
import {colors} from '../../theme';
import Arrow from '../../assets/icons/go.svg';
import {IRedditPost, IEntry} from '../../store/data/types';
import strings from '../../constants/strings';

interface Props {
  entry: IEntry<IRedditPost, string>;
  onPress?: () => void;
}
export const ListItem = ({entry, onPress}: Props) => {
  return (
    <Animatable.View duration={500} animation="fadeInUp">
      <CardButton onPress={onPress} style={styles.card}>
        <Thumbnail
          source={{
            uri:
              entry.data.thumbnail ||
              'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?s=612x612',
          }}
        />
        <Padding style={styles.content} pt={8} pb={8} pl={8} pr={8}>
          <Text mb={4} size={12} color={colors.background.secondary}>
            {entry.data.title}
          </Text>
          <View>
            <Text size={10} color={colors.background.inactivePrimary}>
              {strings.post.sub.replace(
                '{0}',
                entry.data.subreddit || entry.data.subreddit_name_prefixed,
              )}
            </Text>
            <Text size={10} color={colors.typography.inactive}>
              {strings.post.author.replace('{0}', entry.data.author)}
            </Text>
          </View>
        </Padding>
        <View style={styles.arrow}>
          <Arrow fill="#000" />
        </View>
      </CardButton>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    flex: 1,
  },
  content: {justifyContent: 'space-between'},
  arrow: {
    width: 20,
    height: 20,
    position: 'absolute',
    alignSelf: 'center',
    right: 8,
  },
});
