import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ConnectionDetails} from '../components/ConnectionDetails';
import {ErrorContainer} from '../components/ErrorContainer';
import DataContext from '../context/StoreContext';

const Home = () => {
  const {selectedConnection} = useContext(DataContext);
  return (
    <View style={styles.container}>
      {selectedConnection && <ConnectionDetails />}
      {!selectedConnection && <ErrorContainer />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export {Home};
