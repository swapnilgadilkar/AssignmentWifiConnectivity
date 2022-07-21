import React, {useContext} from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/Home';
import {ScanList} from '../screens/ScanList';
import {Images} from '../assets';
import DataContext from '../context/StoreContext';

const Stack = createNativeStackNavigator();
const styles = StyleSheet.create({
  iconImage: {
    width: 30,
    height: 25,
  },
  headerButton: {},
});
const Navigation = () => {
  const {checkLocation} = useContext(DataContext);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({navigation}) => ({
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => navigation.navigate('NearByWifi')}>
                <Image
                  source={Images.scan}
                  width="20"
                  height="20"
                  resizeMethod="auto"
                  style={styles.iconImage}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="NearByWifi"
          component={ScanList}
          options={({navigation}) => ({
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => checkLocation()}>
                <Image
                  source={Images.reload}
                  width="20"
                  height="20"
                  resizeMethod="auto"
                  style={styles.iconImage}
                />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export {Navigation};
