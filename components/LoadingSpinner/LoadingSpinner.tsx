'use strict';
import React, {Component} from 'react';
import {Animated, View, Modal, Easing} from 'react-native';
import styles from './styles';
import images from '../../assets/images';
import Text from '../text';

class LoadingSpinner extends Component<{visible?: boolean}> {
  spinValue: Animated.Value;
  animFn: any;
  animLoop: any;
  constructor(
    props:
      | {visible?: boolean | undefined}
      | Readonly<{visible?: boolean | undefined}>,
  ) {
    super(props);
    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    this._rotateLoadingIndicator();
  }

  componentWillUnmount() {
    this.animFn.stop();
    this.animLoop.stop();
  }

  _rotateLoadingIndicator() {
    this.animFn = Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    this.animLoop = Animated.loop(this.animFn);
    this.animLoop.start();
  }

  render() {
    const {visible} = this.props;

    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <Modal transparent animationType="fade" visible={visible}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}>
          <View
            style={{
              width: 200,
              height: 200,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              borderRadius: 5,
            }}>
            <Animated.Image
              source={images.imgLoader}
              tintColor={'#0095DA'}
              style={[
                styles.loaderImage,
                {
                  tintColor: '#0095DA',
                  transform: [{rotate: spin}],
                },
              ]}
            />
            <Text mt={1}>Please wait...</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

export default LoadingSpinner;
