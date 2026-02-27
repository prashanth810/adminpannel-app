import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Rootnavigator from './src/navigator/Rootnavigator';
import { StyleSheet, View } from 'react-native';
import './global.css';
import { Provider } from 'react-redux';
import Mystore from './src/redux/store/Mystore';

const App = () => {
  return (
    <View style={styles.container}>
      <Provider store={Mystore} >
        <NavigationContainer>
          <Rootnavigator />
        </NavigationContainer>
      </Provider>
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