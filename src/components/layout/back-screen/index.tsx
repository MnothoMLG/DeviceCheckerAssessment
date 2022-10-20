import * as React from 'react';
import {
  TouchableOpacity as Btn,
  SafeAreaView,
  Text,
  View,
  BackHandler,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack/lib/typescript/src/types';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {useEffect} from 'react';
import {Center, Margin, Row} from '../layout';
// import {useLoading} from '../../../hooks/use-loading.hook';
import {useNavigation} from '@react-navigation/native';
// import BackIcon from '../../../assets/icons/BackIcon';

interface IProps {
  title?: string;
  children: React.ReactNode;
  scroll?: boolean;
  onBackPress?: () => void;
  hideback?: boolean;
  useKeyboardScrollView: boolean;
  feedPage: boolean;
  profilePage: boolean;
  loadingKey: string;
}

type Props = IProps & StackScreenProps<{navigation?: any}>;

const HeaderWrapper: React.FC<Props> = (props: Props) => {
  const {
    title,
    children,
    scroll,
    onBackPress,
    hideback,
    useKeyboardScrollView,
    loadingKey = '',
  } = props;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', back_Button_Press);
    return function cleanup() {
      BackHandler.removeEventListener('hardwareBackPress', back_Button_Press);
    };
  }, []);
  const navigation = useNavigation();
  const back_Button_Press = () => {
    navigateBack();
  };

  const navigateBack = () => {
    if (onBackPress) {
      return onBackPress();
    } else if (navigation) {
      navigation.goBack();
    }
  };

  const loading = false; //useLoading(loadingKey);
  if (loading) {
    return (
      <Center>
        <ActivityIndicator />
      </Center>
    );
  }

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#FF2D5580'}}>
        <View style={styles.profilePageTopBarStyles}>
          <Btn
            disabled={hideback}
            style={styles.backBtnStyle}
            onPress={() => navigateBack()}>
            {hideback ? null : (
              <Row>
                <BackIcon fill={'#fff'} />
                <Margin marginRight={10} />
                <Text style={{color: '#fff'}}>Back</Text>
              </Row>
            )}
          </Btn>

          <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
            {title}
          </Text>
          <Btn
            style={styles.backBtnStyle}
            onPress={() => {
              return;
            }}
          />
        </View>
        {useKeyboardScrollView ? (
          <KeyboardAvoidingScrollView
            showsVerticalScrollIndicator={false}
            scrollEnabled={scroll}
            style={{backgroundColor: '#fff'}}>
            {children}
          </KeyboardAvoidingScrollView>
        ) : (
          <>{children}</>
        )}
      </SafeAreaView>
    </>
  );
};

export default HeaderWrapper;

const styles = StyleSheet.create({
  activeTextStyle: {
    color: 'red',
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#01b3ef',
  },
  hidden: {color: '#FAFAFA'},
  topBarStyles: {
    width: '100%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    height: 64,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 24,
    flexDirection: 'row',
    shadowOffset: {height: 10, width: 0},
  },
  profilePageTopBarStyles: {
    width: '100%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    height: 64,
    backgroundColor: '#FF2D5580',
    paddingHorizontal: 24,
    flexDirection: 'row',
    shadowOffset: {height: 10, width: 0},
  },
  backBtnStyle: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#01b3ef',
    fontWeight: '600',
  },
  profilePageBackIcon: {
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
  },
  headerLogo: {
    width: 50,
  },
});
