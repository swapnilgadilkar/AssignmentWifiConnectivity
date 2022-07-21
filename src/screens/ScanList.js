import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {ConnectionsList} from '../components/ConnectionsList';
import {ErrorContainer} from '../components/ErrorContainer';
import DataContext from '../context/StoreContext';
const ScanList = () => {
  const {connectionList = []} = useContext(DataContext);
  return (
    <View style={styles.container}>
      {connectionList && connectionList.length > 0 && (
        <ConnectionsList connections={connectionList} />
      )}
      {connectionList?.length === 0 && <ErrorContainer />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffff',
  },
});
export {ScanList};
