import React, { Component } from 'react';
import { View,TouchableOpacity,Text } from 'react-native';

class LocationBtn extends Component {
    state = {  }
    render() {
        return (
            <TouchableOpacity 
                onPress={this.props.onPress}
                style={{...styles.buttonStyle,...this.props.style}}
                >
                <Text 
                    style={{
                        color:"#fff"
                    }}
                >
                    {this.props.title}
                </Text>
                </TouchableOpacity>
        );
    }
}

const styles={
    buttonStyle :{
        width:100,
        paddingLeft:5,
        paddingRight:5,
        alignItems:'center',
        justifyContent:'center',
        height:30,
        position:'absolute',
        left:20,
        backgroundColor:"#009688"
    }
}

export default LocationBtn;