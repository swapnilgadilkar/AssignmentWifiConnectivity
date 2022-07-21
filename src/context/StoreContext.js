import React, {createContext, useState, useEffect} from 'react';
import * as WifiManagerService from '../services/wifimanager';
import LocationEnabler from 'react-native-location-enabler';
import NetInfo from '@react-native-community/netinfo';
import {requestGpsAccess, showToast} from '../utils/helper';

const DataContext = createContext({});

export const DataProvider = ({children}) => {
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [connectionList, setConnectionList] = useState([]);

  const {
    PRIORITIES: {LOW_POWER},
    addListener,
    checkSettings,
    requestResolutionSettings,
  } = LocationEnabler;
  const config = {
    priority: LOW_POWER,
    alwaysShow: true,
    needBle: false,
  };

  useEffect(() => {
    const listener = addListener(({locationEnabled}) => {
      if (locationEnabled) {
        requestGpsAccess() && fetchAvailbleConnections();
      } else {
        setConnectionList([]);
        requestResolutionSettings(config);
        showToast('Please enable the GPS service...');
      }
    });
    return () => listener.remove();
  }, []);

  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return !array2.some(object2 => {
        return object1.BSSID === object2.BSSID;
      });
    });
  }

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async networkState => {
      if (networkState.isWifiEnabled) {
        networkState.isConnected &&
          networkState.type === 'wifi' &&
          setSelectedConnection({...networkState?.details});
        checkLocation();
      } else {
        setConnectionList([]);
        setSelectedConnection(null);
        const isWifiEnabled = await WifiManagerService.isWifiEnabled();
        if (isWifiEnabled) {
          checkLocation();
        } else {
          const locationPermission = await requestGpsAccess();
          (locationPermission && showToast('Please enable WIFI service...')) ||
            showToast('Please enable WIFI and GPS service...');
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const checkLocation = () => {
    checkSettings(config);
  };

  const fetchAvailbleConnections = async () => {
    const wifiList =
      connectionList.length === 0
        ? await WifiManagerService.getWifiList()
        : await WifiManagerService.refetchWifiList();
    const difference =
      (connectionList.length !== 0 && [
        ...getDifference(wifiList, connectionList),
        ...getDifference(connectionList, wifiList),
      ]) ||
      [];
    if (
      difference.length > 0 ||
      connectionList.length === 0 ||
      wifiList.length === 0
    ) {
      setConnectionList([...wifiList]);
    }
  };

  return (
    <DataContext.Provider
      value={{
        selectedConnection,
        setSelectedConnection,
        connectionList,
        setConnectionList,
        checkLocation,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
