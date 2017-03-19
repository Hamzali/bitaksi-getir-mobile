import React, { Component } from 'react'
import {
  AppRegistry,
  Alert,
  Dimensions
} from 'react-native'

import axios from 'axios'

import Svg,{
    Circle,
    Rect
} from 'react-native-svg'


export default class bitaksi_getir_mobile extends Component {
  
  constructor (props) {
    super(props);

    this.state = {
      shapes: []
    };
  }

  componentWillMount () {
    axios({
      method: 'post',
      url: 'https://getir-bitaksi-hackathon.herokuapp.com/getElements',
      data: {
        "email" : "hamzalitas95@gmail.com",
        "name" : "Hamza Ali TAS",
        "gsm" : "5545077657"
      }
    })
    .then(res => {
      
      this.setState({shapes: res.data.elements});
      
    })
    .catch(err => {
      Alert.aler(err);
    })
  }

  drawShapes = () => {
    return this.state.shapes.map((shape, key) => {
            if (shape.type === 'circle') {
              return (
                <Circle 
                  key={key}
                  cx={+shape.xPosition}
                  cy={+shape.yPosition}
                  r={+shape.r}
                  fill={'#' + shape.color}/>
              );
            }

            if (shape.type === 'rectangle') {
              return (
                <Rect
                  key={key}
                  x={+shape.xPosition}
                  y={+shape.yPosition}
                  width={+shape.width}
                  height={+shape.height}
                  fill={'#' + shape.color}/>
              );
            }
          })
  }
  render() {
    let {height, width} = Dimensions.get('window');
    return (
        <Svg 
          height={+height}
          width={+width}>
        {
          this.drawShapes()
        }
        </Svg>
    );
  }
}

AppRegistry.registerComponent('bitaksi_getir_mobile', () => bitaksi_getir_mobile);
