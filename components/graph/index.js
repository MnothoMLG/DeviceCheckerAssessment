import React, {Component} from 'react';
import {PanResponder, Platform, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-spinkit';
import Svg, {Line} from 'react-native-svg';
import {AreaChart, XAxis, YAxis} from 'react-native-svg-charts';
import {connect} from 'react-redux';
import {
  FilterComms,
  GetAllComms,
  addToFavourites,
  clearError,
  clearGraphData,
  getFavourites,
  removeFromFavourites,
  updateGeturePos,
  updateRange,
} from '../../actions/appActions';
import {Text} from '..';
import {Colors, Fonts, Enums, Metrics} from '../../constants';
import {months} from '../../utils/dateTime';
import styles from './styles';
import {
  iPhoneLarge,
  smalleriPhone,
  height,
  width,
} from '../../utils/screenSize';
import {
  PathLine,
  CustomGrid,
  Gradient,
  rad,
  Decorator,
  filterCondtions,
  rangeLabels,
  rangeScales,
  Tooltip,
  CursorLine,
} from './components';

const roundedOff = (num, decimals = 2) => {
  return Number(num).toFixed(decimals);
};

let toolTipDisplayValue = 0;
const updateTooltipValue = val => {
  toolTipDisplayValue = val;
};

class Graph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      xCords: null,
      yCords: null,
      focusedPtX: null,
      focusedPtY: null,
      showToolTip: false,
      focusedVal: null,
      selectedRange: this.props.graphRange,
      normalize: false,
      noData: true,
      showGraph: true,
      showGradient: false,
      gestureX: null,
      updates: 0,
      toolTipValue: null,
      renders: 0,
      decoratorScreenOffset: null,
      width: Metrics.window.width,
      height: Metrics.window.height,
    };

    this.onLayout = this.onLayout.bind(this);
  }

  onLayout(e) {
    this.setState({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    });
  }

  convertDate = (numFormat, range) => {
    // 2018-06-10
    let inclDay = true; //(range === '1w' || range === '1m')
    let dateArray = numFormat.split('-');
    let monthNo = Number(dateArray[1]);
    let date = inclDay
      ? `${dateArray[2]} ${months[monthNo - 1].slice(
          0,
          3,
        )} '${dateArray[0].slice(-2, 4)}`
      : `${months[monthNo - 1].slice(0, 3)} '${dateArray[0].slice(-2, 4)}`;
    return date;
  };

  componentWillMount() {
    const {selectedRange} = this.state;
    const {updateX} = this.props;
    this.updateData(selectedRange);
    //updateX(100)
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderEnd: (e, gestureState) => true,
      onStartShouldSetPanResponder: () => {
        return true;
      },

      onStartShouldSetPanResponderCapture: () => {
        return true;
      },
      onMoveShouldSetPanResponder: () => {
        return true;
      },
      onMoveShouldSetPanResponderCapture: () => {
        return true;
      },
      onPanResponderMove: (event, gesture) => {
        updateX(gesture.moveX);
      },
      onPanResponderRelease: (evt, gestureState) => {
        updateX(null);
      },
      onPanResponderGrant: () => {
        //this.setState({gestureX : null, showToolTip : true })
        updateX(null);
      },
    });
  }

  componentDidMount() {
    let gradDelay = 500;

    setTimeout(() => {
      this.setState({showGradient: true});
    }, gradDelay);
  }

  renderLoader() {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Spinner color={Colors.secondayGreen} type={'Pulse'} />
      </View>
    );
  }

  rangeChange(range) {
    const {filterComms, updateGraphRange, clearCurrentCommData, entry} =
      this.props;
    this.setState({
      selectedRange: range,
      showToolTip: false,
      showGradient: false,
      renders: 0,
    });
    updateGraphRange(range);
    this.updateData(range);

    }

  renderRanges() {
    const {selectedRange} = this.state;
    const {onLandScape} = this.props;
    const ranges = ['1w', '1m', '1y', '5y', '10y'];
    let boldFont = onLandScape ? Fonts.tinyBold : Fonts.buttonBold;
    let normalFont = onLandScape ? Fonts.tiny : Fonts.button;
    return (
      <View
        style={[
          styles.rangesWrapper,
          onLandScape ? {height: Metrics.base * 2} : null,
        ]}>
        {ranges.map(range => {
          let selected = selectedRange === range;
          return (
            <TouchableOpacity
              onPress={() => {
                this.rangeChange(range);
              }}>
              <View
                style={[styles.range, selected ? styles.rangeSelected : null]}>
                <Text
                  color={selected ? Colors.white : Colors.textGrey}
                  font={selected ? boldFont : normalFont}>
                  {range.toUpperCase()}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  updateData(range) {
    const {currentCommData, filterComms, clearCurrentCommData, entry} =
      this.props;
    const {selectedRange} = this.state;
    // ==== local loading
    this.setState({noData: true});
    let plotData = currentCommData[range];
    let yS = [];
    let xS = [];

    let filterBy = indexJumpScale[range];
    if (plotData !== null) {
      plotData.map(({date, price}, index) => {
        if (range !== '1w' && range !== '1m') {
          if (index % filterBy === 0) {
            yS.push(Number(price));
            let converted = this.convertDate(date, range);
            xS.push(converted);
          }
        } else if (range === '1w' || range === '1m') {
          if (index % filterBy === 0) {
            yS.push(Number(price));
            let converted = this.convertDate(date, range);
            xS.push(converted);
          }
        }
      });
    }

    setTimeout(() => {
      this.setState({
        xCords: xS.reverse(),
        yCords: yS.reverse(),
        noData: false,
      }); //reversed the arrays
    }, 500);

    // else {
    let gradDelay = 500;
    // if (["1y","5y","10y"].includes(this.state.selectedRange.toLowerCase())){
    //     gradDelay = 6000
    // }
    setTimeout(() => {
      this.setState({showGradient: true});
    }, gradDelay);
  }

  componentWillUpdate() {}



    render (){
    const {
      yCords,
      xCords,
      noData,
      decoratorScreenOffset,
      showGradient,
      selectedRange,
      width,
      renders,
    } = this.state;
    const contentInset = {top: 10, bottom: 10, right: 0};
    const {commodityMeasure, onLandScape, showGraph} = this.props;
    const largeScale = rangeScales[selectedRange];

    return [
      this.renderRanges(),
      <View
        style={{
          justifyContent: 'center',
          marginBottom: smalleriPhone ? Metrics.base * 2 : 0,
        }}>
        <Tooltip
          viewWidth={width}
          decoratorScreenOffset={decoratorScreenOffset}
          onLandScape={onLandScape}
        />
        {!noData && showGraph ? (
          <Animatable.View
            animation={'fadeIn'}
            style={{
              flex: 1,
              height: '90%',
              width: '100%',
              marginTop: onLandScape ? Metrics.base * 2.5 : Metrics.base * 3.5,
              flexDirection: 'row',
              paddingHorizontal: Metrics.base * 2,
              paddingBottom: Metrics.base,
              zIndex: 1000,
            }}>
            <View style={{flex: 1, height: '100%', width: '100%'}}>

                <View style={styles.y_graph_Wrapper}>
                <View style={styles.yAxisLabel}>
                  <Text
                    align={'center'}
                    color={Colors.overlayDark60}
                    styles={{
                      text: {
                        width: 250,
                        ...Fonts.caption,
                        transform: [{rotate: '-90deg'}],
                      },
                    }}>
                    {`Price  (USD/${commodityMeasure})`}
                  </Text>
                </View>
                <View
                  style={{
                    width: Metrics.base * 6,
                    height: '100%',
                    borderRightWidth: 1,
                    zIndex: 1000,
                  }}>
                  <YAxis
                    contentInset={contentInset}
                    data={yCords}
                    formatLabel={value => `${roundedOff(value)}`}
                    //numberOfTicks={7}
                    style={{width: '100%', height: '100%', zIndex: -10}}
                    svg={{...Fonts.tiny, fill: Colors.overlayDark60}}
                  />
                </View>
                <View
                  {...this.panResponder.panHandlers}
                  style={styles.graphBottomWrapper}>
                  {showGraph && (

                      contentInset={{top: 10, bottom: 10}}
                      data={yCords}
                      style={styles.chartStyles}
                      svg={{fill: 'url(#gradient)'}}>

                    >

                      <CustomGrid belowChart={false}
                        xCords={xCords}
                        panResponder={this.panResponder}
                        filterby={largeScale ? 6 : 1}
                      />

                      <PathLine
                        key={'pathline'}
                        showGraph={showGraph}
                        duration={durations[selectedRange] || 4000}
                      />
                      <Gradient showGradient={showGradient}></Gradient>

                      <Decorator
                        selectedRange={selectedRange}
                        setDecoratorsOffset={decOffset => {
                          this.setState({decoratorScreenOffset: decOffset});
                        }}
                      />
                      {decoratorScreenOffset && (
                        <CursorLine
                          decoratorScreenOffset={decoratorScreenOffset}
                        />
                      )}
                    </AreaChart>

                  </View>
              </View>
              <View
                style={{
                  height: '8%',
                  flexDirection: 'row',
                  width: '100%',
                  paddingLeft: Metrics.base * 8,
                }}>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <XAxis
                    data={xCords}
                    formatLabel={(value, index) => {
                      if (
                        filterCondtions(selectedRange, index, xCords.length)
                      ) {
                        let week = selectedRange === '1w';
                        let slicedLabel =
                          selectedRange === '1m'
                            ? xCords[value].slice(0, 7)
                            : xCords[value].slice(3);
                        let label = week ? `${xCords[value]}` : slicedLabel;

                        if (index === xCords.length - 1)
                          return label.padEnd(week ? 28 : 20, ' ');
                        //pad last value
                        else if (index === 0)
                          return label.padStart(week ? 28 : 20, ' ');

                        return label;
                      }

                    style={{
                      flexDirection: 'row',
                      height: '100%',
                      borderTopWidth: 1,
                      overflow: 'visible',
                    }}
                    svg={{
                      ...Fonts.tiny,
                      fill: Colors.overlayDark60,
                      alignSelf: 'center',
                    }}
                  />
                  <Text color={Colors.overlayDark60} font={Fonts.caption}>
                    {rangeLabels[selectedRange.toUpperCase()]}
                  </Text>
                </View>
              </View>
            </View>

            </Animatable.View>
          this.renderLoader()
        )}
      </View>,

        ];       

    }
}

const mapDispatchToProps = dispatch => ({
  addToFavs: payload => dispatch(addToFavourites(payload)),
  removeFav: payload => dispatch(removeFromFavourites(payload)),
  getFavs: () => dispatch(getFavourites()),
  getCommodities: () => dispatch(GetAllComms()),
  filterComms: (name, range) => dispatch(FilterComms(name, range)),
  clearErrorMSg: () => dispatch(clearError()),
  clearCurrentCommData: () => dispatch(clearGraphData()),
  updateX: payload => dispatch(updateGeturePos(payload)),
});

//changes in reducers not connected will not affect
const mapStateToProps = state => ({
  // the component only listens for changes in the specific reducers then it changes
  favourites: state.dataReducer.favourites,
  commsObject: state.localState.commoditiesObject,
  currentCommData: state.localState.focusedCommTrend,
  error: state.localState.error,
  deviceWidth: state.dataReducer.deviceWidth,
  rangeFocusedOn: state.dataReducer.rangeFocusedOn,
  deviceHeight: state.dataReducer.deviceHeight,
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);

const durations = {'5y': 4500, '10y': 5000};

const indexJumpScale = {'1w':1, '1m' : 1 , '1y' :2, '5y' : 3, '10y' : 5 }
