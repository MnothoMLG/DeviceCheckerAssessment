// import * as Sentry from '@sentry/browser'

import React from 'react'
import { Image, View } from 'react-native'

import  Images  from '../../assets/images'
import config from '../../config/app'
import { Fonts, Metrics, Strings, Colors } from '../../constants'
import { Button, Modal, Text } from '..'
import Styles from './styles'

const {width , height} = Metrics.window

export default class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    Sentry.init({
      dsn: 'https://ac3f2e646bd24bfc9c53e813698be3aa@sentry.io/1489764',
      //release: '0.5.0'
    })

    this.state = {
      error: false,
      message: 'Something went wrong. Please report this.'
    }
  }

  componentDidCatch (error, errorInfo) {
    this.setState({
      error: true,
      message: errorInfo.componentStack.toString()
    })

    // log it on sentry
    // Sentry.withScope(scope => {
    //   Object.keys(errorInfo).forEach(key => {
    //     scope.setExtra(key, errorInfo[key])
    //   })
    //   Sentry.captureException(error)
    // })
  }


  render () {
    const {
      error,
      message
    } = this.state
    const buttonProps = {
      height: Metrics.base * 6,
      width: width * 0.35,
      mh: 1,
      font: Fonts.buttonBold
    }

    if (error) {
      return (
        <View style={Styles.outerContainer}>
          <Modal
            height={height}
            visible={error}
            width={width}
            transparent={true}
          >
            <View style={Styles.modalInnerContainer}>
                <Image
                  resizeMode="contain"
                  source={Images.logo}
                  style={Styles.logo}
                />
                <View style={Styles.modalContainer}>
                
                <View style={Styles.topContainer}>
                  <Text
                    align={'center'}
                    color={Colors.white}
                    font={Fonts.titleBold}
                    mv={2}
                  >
                    {Strings.commonError}
                  </Text>
                </View>
                <View style={Styles.errorTextContainer} > 

                  <Text
                    align={'center'}
                    color={Colors.white}
                    font={Fonts.heading}
                    mh={6}
                    mv={4}
                    numberOfLines={50}
                  >
                    {config.isDev ? message : Strings.errorCrashBody}
                  </Text>

                </View>


                <View style={Styles.buttonContainer}>
                  <Button
                    {...buttonProps}
                    textColor={Colors.white}
                    backgroundColor={Colors.secondayGreen}
                    label={Strings.errorReport}
                    theme={'_5'}
                    onPress={() => {
                      Sentry.showReportDialog({ eventId: '@SentrySdk.LastEventId' });
                    }}
                  />
                  <Button
                    {...buttonProps}
                    textColor={Colors.white}
                    backgroundColor={Colors.romansRed}
                    label={Strings.commonClose}
                    theme={'_1'}
                    // onPress={app.quit}
                  />
                </View>
              </View>
              </View>
          </Modal>
        </View> 
      )
    }
    return this.props.children
  }
}
