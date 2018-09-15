import React, { Component } from 'react';
import { View,Text } from 'react-native';

class Header extends Component {
    state = {  }
    render() {
        return (
            <View
                style={{
                    height:70,
                    alignItems:"center",
                    backgroundColor:"#006622",
                    paddingTop:40
                }}
            >
                <Text style={{color:"#fff"}} >
                    {this.props.children}
                </Text>
            </View>
        );
    }
}

export default Header;