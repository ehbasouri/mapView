import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapPreview from './src/MapPreview';

export default class App extends React.Component {
  render() {
    return (
      <MapPreview/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
