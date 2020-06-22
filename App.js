import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import HomeScreen from './screens/HomeScreen'

//axios
//import axios from './node_modules/axios/';
import Colors from './constants/Colors';
import MovieScreen from './screens/MovieScreen';



const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();


  const options = {
    title: "Moives",
    headerStyle: styles.header,
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={options} />
            <Stack.Screen name="Movies" component={MovieScreen} options={options} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: Colors.main,
  }
});
