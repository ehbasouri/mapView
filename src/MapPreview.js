import React, { Component } from 'react';
import {MapView,Constants, Location, Permissions} from 'expo';
import {View,Image,Platform,TouchableOpacity} from 'react-native';
import LocationBtn from './LocationBtn';
import GpsIcon from './gps.png';

class MapPreview extends Component {
    constructor(){
        super()
        this.state={
            Region :null,
            location_01:{
              latitude:32.7325015,
              longitude:51.6885883,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121
            },
            location_02:{
              latitude:35.6541867,
              longitude:51.4226364,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121
            },
            location_03:{
              latitude:36.8360023,
              longitude:54.440441,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121
            },
            location_04:{
              latitude:38.0829172,
              longitude:46.3027029,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121
            }
          }
        this.Region; 
    }
    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
          this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
          });
        } else {
          this._getLocationAsync();
        }
      }
      _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
    
        let location = await Location.getCurrentPositionAsync({});
        this.Region=location;
      };

      animate=(location)=>{
        if (location) {
        this._Map.animateToRegion(location,2000)
        }
      }
      changeMyLocation=(e)=>{
        var long= e.nativeEvent.coordinate.longitude;
        var lat = e.nativeEvent.coordinate.latitude;
        var mylocation ={
          latitude : lat,
          longitude: long,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }
        this.Region=mylocation
      }
    render() {
        return (
            <View style={{flex:1}} >
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={null}
                    region={this.state.Region}
                    showsUserLocation={true}
                    onUserLocationChange={this.changeMyLocation}
                    ref={Map=>{this._Map = Map}}
                >
                <MapView.Marker
                coordinate={this.state.location_01}
                title="location_01"
                />
                <MapView.Marker
                    coordinate={this.state.location_02}
                    title="location_02"
                />
                <MapView.Marker
                    coordinate={this.state.location_03}
                    title="location_03"
                />
                <MapView.Marker
                    coordinate={this.state.location_04}
                    title="location_04"
                />
                </MapView>
                <TouchableOpacity 
                onPress={()=>this.animate(this.Region)}
                style={{
                    bottom:30,
                    right:30,
                    height:30,
                    width:30,
                    backgroundColor:"#fff",
                    position:"absolute",
                    alignItems:"center",
                    justifyContent:"center",
                }}
                >
                <Image style={{
                    width:24,
                    height:24
                    }} source={GpsIcon} />
                </TouchableOpacity>
                <LocationBtn
                onPress={()=>this.animate(this.state.location_01)}
                style={{
                    bottom:10
                }}
                title="location_01"
                />
                <LocationBtn
                onPress={()=>this.animate(this.state.location_02)}
                style={{
                    bottom:50
                }}
                title="location_02"
                />
                <LocationBtn
                onPress={()=>this.animate(this.state.location_03)}
                style={{
                    bottom:90
                }}
                title="location_03"
                />
                <LocationBtn
                onPress={()=>this.animate(this.state.location_04)}
                style={{
                    bottom:130
                }}
                title="location_04"
                />
            </View>
        );
    }
}

export default MapPreview;