import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Rootnavigator from './src/navigator/Rootnavigator';
import { StyleSheet, View } from 'react-native';
import './global.css';

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Rootnavigator />
      </NavigationContainer>
    </View>
  );
}
export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  }
});