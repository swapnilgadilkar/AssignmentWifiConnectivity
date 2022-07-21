import React, {useContext, useState} from 'react';
import {FlatList, View, TouchableOpacity, StyleSheet} from 'react-native';
import DataContext from '../context/StoreContext';
import {Connection} from './Connection';
import {AskPassword} from './ModalPopup';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    margin: 10,
  },
});

const ConnectionsList = ({connections = []}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const {selectedConnection} = useContext(DataContext);

  return (
    <View style={styles.container}>
      {showModal && (
        <AskPassword
          showModal={showModal}
          setShowModal={setShowModal}
          selectedNetwork={selectedNetwork}
          setSelectedNetwork={setSelectedNetwork}
        />
      )}
      <FlatList
        data={connections}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
              setSelectedNetwork(item);
            }}
            disabled={item?.BSSID === selectedConnection?.bssid}>
            <Connection item={item} />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        extraData={connections}
        keyExtractor={item => item?.BSSID}
      />
    </View>
  );
};

export {ConnectionsList};
