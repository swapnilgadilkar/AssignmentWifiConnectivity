import Modal from 'react-native-modal';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {HEIGHT, showToast, WIDTH} from '../utils/helper';
import * as WifiManager from '../services/wifimanager';
import DataContext from '../context/StoreContext';

const AskPassword = ({
  showModal,
  setShowModal,
  selectedNetwork,
  setSelectedNetwork,
}) => {
  const [password, setPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {selectedConnection} = useContext(DataContext);
  const {SSID = '', BSSID = ''} = selectedNetwork;
  useEffect(() => {
    setIsModalVisible(showModal);
  }, [showModal]);
  const handleConnect = async () => {
    const conn = await WifiManager.connectToProtectedSSID(
      SSID,
      password,
      false,
    );
    if (conn === 'connected') {
      setShowModal(false);
      setSelectedNetwork(null);
      showToast('Successfully connected.');
    } else {
      showToast('Failed to establish a connection.');
    }
  };
  return (
    <Modal style={styles.modalContainer} isVisible={isModalVisible}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Password required to connect</Text>
          <Text style={styles.headerText}>{SSID}</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.passwordField}
              placeholder="Password"
              value={password}
              onChangeText={txt => setPassword(txt)}
              autoFocus
              editable={selectedConnection?.bssid !== BSSID}
            />
          </View>
          <View style={styles.decisionButtonsContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                setShowModal(false);
                setSelectedNetwork(null);
              }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                password.length > 7 ? {backgroundColor: '#1616FF'} : {},
              ]}
              onPress={() => handleConnect()}
              disabled={password.length < 7}>
              <Text style={[password.length > 7 ? {color: 'white'} : {}]}>
                Connect
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: HEIGHT * 0.3,
    width: WIDTH * 0.8,
    borderRadius: 12,
  },
  modalContainer: {justifyContent: 'center', alignItems: 'center'},
  passwordField: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#1616FF',
    borderRadius: 10,
  },
  decisionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    borderRadius: 18,
    padding: 12,
    width: 100,
    alignItems: 'center',
    backgroundColor: '#C3CEDA',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    flex: 4,
    justifyContent: 'space-evenly',
  },
});

export {AskPassword};
