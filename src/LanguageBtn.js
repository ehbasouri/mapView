import React, { Component } from 'react';
import { TouchableOpacity,Text } from 'react-native';

class LangoageBtn extends Component {
    state = {  }
    render() {
        return (
            <TouchableOpacity 
                onPress={this.props.onPress}
                style={{
                    position:"absolute",
                    height:45,
                    backgroundColor:"#006622",
                    alignItems:"center",
                    justifyContent:"center",
                    left:10,
                    right:10,
                    bottom:10
                }}
            >
                <Text style={{color:"#fff"}} >
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        );
    }
}

export default LangoageBtn;