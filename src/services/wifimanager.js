import WifiManager from 'react-native-wifi-reborn';
import {showToast} from '../utils/helper';

const isWifiEnabled = async () => {
  return await WifiManager.isEnabled().catch(e => showToast(e.message));
};

const isConnected = async () => {
  return await WifiManager.connectionStatus().catch(e => showToast(e.message));
};

const toggleWifiEnable = async setEnableMent => {
  return await WifiManager.setEnabled(setEnableMent).catch(e =>
    showToast(e.message),
  );
};

const disconnectConnection = async () => {
  return await WifiManager.isRemoveWifiNetwork().catch(e =>
    showToast(e.message),
  );
};

const getWifiList = async () => {
  return await WifiManager.loadWifiList().catch(e => {
    showToast(e.message);
  });
};

const refetchWifiList = async () => {
  return await WifiManager.reScanAndLoadWifiList().catch(e => {
    showToast(e.message);
  });
};

const getBasicServiceSetIdentifier = async () => {
  return await WifiManager.getBSSID().catch(e => showToast(e.message));
};

const getCurrentSignalStrength = async () => {
  return await WifiManager.getCurrentSignalStrength().catch(e =>
    showToast(e.message),
  );
};

const getFrequency = async () => {
  return await WifiManager.getFrequency().catch(e => showToast(e.message));
};

const getIP = async () => {
  return await WifiManager.getIP().catch(e => {
    showToast(e.message);
  });
};

const isRemoveWifiNetwork = async () => {
  return await WifiManager.isRemoveWifiNetwork().catch(e => {
    showToast(e);
  });
};

const connectToProtectedSSID = async (ssid, password, isWep) => {
  return await WifiManager.connectToProtectedSSID(ssid, password, isWep).catch(
    e => {
      showToast(e.message);
    },
  );
};

const getCurrentWifiSSID = async () => {
  return await WifiManager.getCurrentWifiSSID().catch(e => {
    showToast(e.message);
  });
};

export {
  isWifiEnabled,
  refetchWifiList,
  getWifiList,
  toggleWifiEnable,
  isConnected,
  getBasicServiceSetIdentifier,
  getCurrentSignalStrength,
  disconnectConnection,
  getFrequency,
  getIP,
  isRemoveWifiNetwork,
  connectToProtectedSSID,
  getCurrentWifiSSID,
};
