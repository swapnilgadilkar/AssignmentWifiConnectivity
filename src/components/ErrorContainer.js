import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 20,
  },
  headerLine: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
const ErrorContainer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerLine}>
        Please consider below points : {'\n'}
      </Text>
      <Text>
        1. If you have not connected to any wifi please tap on scan icon on top
        right of toolbar and select any wifi n/w to connect.
      </Text>
      <Text>2. Please confirm your WIFI and GPS is Enabled.</Text>
      <Text>3. Location Permission is given for the app.</Text>
      <Text>4. There should be any active WIFI near to you.</Text>
    </View>
  );
};

export {ErrorContainer};
