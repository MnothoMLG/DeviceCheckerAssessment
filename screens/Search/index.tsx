import React from 'react';
import {FlatList} from 'react-native';
import {Text} from '../../components';
import {Fonts, Colors} from '../../constants';
import {View, ImageBackground, SafeAreaView} from 'react-native';
import images from '../../assets/images';
import styles from './styles';

const MainView = () => {
  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 20}}>
      <Text
        styles={{text: {alignSelf: 'center'}}}
        font={Fonts.displayBold}
        color={Colors.overlayDark90}>
        {'Browse'}
      </Text>
      <FlatList
        numColumns={2}
        data={categoryList}
        style={{paddingTop: 42, marginTop: 24}}
        renderItem={({item, index}) => (
          <CategoryCard leftComp={index % 2 === 0} category={item} />
        )}
      />
    </SafeAreaView>
  );
};

const CategoryCard = ({category, leftComp}) => {
  return (
    <ImageBackground
      source={category.image}
      style={[
        styles.categoryBg,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          marginRight: leftComp ? 2 : 0,
        },
      ]}>
      <View style={styles.categoryOverlay}>
        <Text font={Fonts.display} color={Colors.white}>
          {category.name}
        </Text>
      </View>
    </ImageBackground>
  );
};

const categoryList = [
  {name: 'BBQ', image: images.bbq},
  {name: 'Sushi', image: images.sushi},
  {name: 'Pizza', image: images.combo},
  {
    name: 'African',
    image: images.african,
  },
  {
    name: 'Seafood',
    image: images.seafood,
  },
  {
    name: 'Vegetarian',
    image: images.seafood,
  },
];

export default MainView;
