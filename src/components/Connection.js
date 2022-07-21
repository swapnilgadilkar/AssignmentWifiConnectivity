import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Images} from '../assets';
import DataContext from '../context/StoreContext';

const Connection = ({item}) => {
  const {selectedConnection} = useContext(DataContext);
  return (
    <View style={styles.container}>
      <Text>{item.SSID}</Text>
      {selectedConnection &&
        item &&
        selectedConnection.bssid === item.BSSID && (
          <Image source={Images.selected_icon} style={styles.checkedIcon} />
        )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '96%',
    padding: 12,
    borderWidth: 0.5,
    borderColor: 'black',
    flexGrow: 1,
    margin: 6,
  },
  checkedIcon: {
    width: 22,
    height: 22,
  },
});
export {Connection};
