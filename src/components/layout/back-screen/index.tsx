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
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../../../assets/icons/back.svg';
import {useLoading} from '../../../hooks/useLoadingHook';
import {colors} from '../../../theme';
import styles from './styles';
interface IProps {
  title?: string;
  children: React.ReactNode;
  scroll?: boolean;
  onBackPress?: () => void;
  hideback?: boolean;
  useKeyboardScrollView: boolean;
  loadingKey?: string;
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

  const loading = useLoading(loadingKey);
  if (loading) {
    return (
      <Center>
        <ActivityIndicator />
      </Center>
    );
  }

  return (
    <>
      <SafeAreaView
        style={{flex: 1, backgroundColor: colors.background.secondary}}>
        <View style={styles.topBar}>
          <Btn
            disabled={hideback}
            style={styles.backBtnStyle}
            onPress={() => navigateBack()}>
            {hideback ? null : <BackIcon fill={'#fff'} />}
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
            style={{backgroundColor: colors.background.bgDark}}>
            {children}
          </KeyboardAvoidingScrollView>
        ) : (
          children
        )}
      </SafeAreaView>
    </>
  );
};

export default HeaderWrapper;
