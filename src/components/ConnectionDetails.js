import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import DataContext from '../context/StoreContext';
import {BASE_URL, PAYLOAD, showToast} from '../utils/helper';

const ConnectionDetails = () => {
  const {selectedConnection} = useContext(DataContext);
  const [loading, setLoading] = useState(false);

  const {
    bssid = '',
    ssid = '',
    frequency = '',
    strength = '',
    ipAddress = '',
    subnet = '',
    linkSpeed = '',
  } = selectedConnection;

  const postData = async () => {
    setLoading(true);
    await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: PAYLOAD,
    })
      .then(() => {
        setLoading(false);
        showToast('Request Successful');
      })
      .catch(e => {
        setLoading(false);
        showToast('ERROR WHILE MAKING THE REQUEST');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Connected to {'\n'}
        {ssid}
      </Text>
      <View style={styles.detailContainer}>
        <View style={styles.buttonContainer}>
          {loading && <ActivityIndicator size={'small'} />}
          {!loading && (
            <TouchableOpacity
              style={styles.pingbutton}
              onPress={() => postData()}>
              <Text style={{color: 'black'}}>PING</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.field}>Network Details : </Text>
        <Text style={styles.field}>BSSID : {bssid} </Text>
        <Text style={styles.field}>ipAddress : {ipAddress}</Text>
        <Text style={styles.field}>subnet : {subnet}</Text>
        <Text style={styles.field}>frequency : {frequency}</Text>
        <Text style={styles.field}>strength : {strength}</Text>
        <Text style={styles.field}>linkSpeed : {linkSpeed}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 140,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  pingbutton: {borderWidth: 2, borderColor: 'blue', padding: 10},
  header: {color: 'black', fontSize: 26, textAlign: 'center'},
  field: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailContainer: {
    paddingTop: 20,
  },
});
export {ConnectionDetails};
