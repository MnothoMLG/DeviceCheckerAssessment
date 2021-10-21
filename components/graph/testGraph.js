import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {VictoryArea,VictoryChart,createContainer,VictoryTooltip,VictoryScatter,VictoryLine } from 'victory-native';
import {range, first, last,maxBy } from 'lodash';
import Svg,{Line} from 'react-native-svg';

const VictoryZoomVoronoiContainer = createContainer( "cursor","voronoi");

const data = range(20,1000).map((x) => ({x, y: x*x}));

const findClosestPointSorted = (data, value) => {  
  if (value === null) return null;
    const start = first(data).x;
    const range = (last(data).x - start);
  const index = Math.round((value - start)/range * (data.length - 1));
  return data[index];
};

export default class Chart extends Component {
    componentWillMount()
    {
        this.setState({ymax:maxBy(data,function(o) { return o.y; }).y})
    }

    state = {
        activePoint:null,
        data:data,
        ymax :0
    }
    handleCursorChange(value) {           

    this.setState({
        activePoint: findClosestPointSorted(data, value)
    });
  }

    render() {
        const { activePoint } = this.state;
        const point = activePoint ?
            <VictoryScatter name = "scatter" data={[activePoint]} style={{data: {size: 200,fill:'#ffffff',stroke:'#1bad53',strokeWidth:2} }}/>
          : null;

        return (
            <View>
                <VictoryChart
                    height={300}
                    width={350}
                    containerComponent={
                        <VictoryZoomVoronoiContainer
                        voronoiDimension="x"
                        cursorDimension="x"
                        voronoiBlacklist={["scatter"]}
                        labelComponent={<VictoryTooltip style={{fill:'red'}}  flyoutStyle={{
                        fill:  'rgba(52, 52, 52, 0.8)',}}/>}
                        onCursorChange={(value)=>{this.handleCursorChange(value)}}
                        labels={cursor => {

                            try {

                                return(activePoint.x?`${activePoint.x}, ${Math.round(activePoint.y)}\ndjh`:null)
                            } catch (error) {
                              
                            }
                        }}
                        />
                    }
                 >

            <VictoryArea
            name = "area"
            data={data}
            interpolation="cardinal"
            style={{
            data: { 
                fill: '#1bad53',
                stroke: '#05a543',
                strokeWidth: 2
            }
            }}
            />
             {point}

          {activePoint?<Line  x1= {50} x2="300" y1={250-(200/this.state.ymax)*activePoint.y} y2={250-(200/this.state.ymax)*activePoint.y} stroke="black" strokeWidth="1"/>:null}

        </VictoryChart>
            </View>
        )
    }
}