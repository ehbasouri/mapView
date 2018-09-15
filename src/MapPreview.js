import React, { Component } from 'react';
import {MapView,Constants, Location, Permissions} from 'expo';
import {View,Image,Text,Platform,Dimensions,TouchableOpacity} from 'react-native';
import LocationBtn from './LocationBtn';
import GpsIcon from '../assets/gps.png' ;
import Header from './Header';
import I18n from '../i18n';
import LangoageBtn from './LanguageBtn';
import Locations from './Locations'

const languages = [
    {lang:"English",code:"en"},
    {lang:"Persian",code:"per"}
]

class MapPreview extends Component {
    constructor(){
        super()
        this.state={
            value:false,
            Region :null,
            location_01:Locations.location_01,
            location_02:Locations.location_02,
            location_03:Locations.location_03,
            location_04:Locations.location_04,
            showLanguageMenu:false
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
      onChangeLanguage=(language)=>{
          this.setState({showLanguageMenu:false})
          I18n.locale=language;
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
      renderLangMenu=()=>{
          if (this.state.showLanguageMenu) {
            return (
                <View 
                  style={{
                      position:"absolute",
                      zIndex:10,
                      height:SCREEN_HEIGHT,
                      width:SCREEN_WIDTH,
                      backgroundColor:"rgba(0,0,0,0.7)",
                      alignItems:"center",
                      justifyContent:'center'
                  }}
                >
                {
                    languages.map((language,i)=>
                      <Text
                          onPress={()=>this.onChangeLanguage(language.code)}
                          style={{color:"#fff",fontSize:30,marginTop:10,borderBottomColor:"#fff",borderBottomWidth:1}} 
                          key={i} >
                          {language.lang}
                      </Text>
                  )
                }
                </View>
                )
          }
      }
    render() {
        return (
            <View style={{flex:1}} >
                <Header>
                    {I18n.t("Map")}
                </Header>
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
                    title={I18n.t("Isfahan")}
                />
                <MapView.Marker
                    coordinate={this.state.location_02}
                    title={I18n.t("Tehran")}
                />
                <MapView.Marker
                    coordinate={this.state.location_03}
                    title={I18n.t("Gorgan")}
                />
                <MapView.Marker
                    coordinate={this.state.location_04}
                    title={I18n.t("Tabriz")}
                />
                </MapView>
                <TouchableOpacity 
                onPress={()=>this.animate(this.Region)}
                style={{
                    bottom:70,
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
                    bottom:70
                }}
                title={I18n.t("Isfahan")}
                />
                <LocationBtn
                onPress={()=>this.animate(this.state.location_02)}
                style={{
                    bottom:105
                }} 
                title={I18n.t("Tehran")}
                />
                <LocationBtn
                onPress={()=>this.animate(this.state.location_03)}
                style={{
                    bottom:140
                }}
                title={I18n.t("Gorgan")}
                />
                <LocationBtn
                onPress={()=>this.animate(this.state.location_04)}
                style={{
                    bottom:175
                }}
                title={I18n.t("Tabriz")}
                />
                <LangoageBtn
                    onPress={()=>this.setState({showLanguageMenu:true})}
                    title={I18n.t("Change_Language")}
                />
                {this.renderLangMenu()}
            </View>
        );
    }
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default MapPreview;