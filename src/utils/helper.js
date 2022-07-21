import {PermissionsAndroid} from 'react-native';
import {Dimensions} from 'react-native';
import {ToastAndroid} from 'react-native';
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const requestGpsAccess = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location permission is required for WiFi connections',
      message:
        'This app needs location permission as this is required  ' +
        'to scan for wifi networks.',
      buttonNegative: 'DENY',
      buttonPositive: 'ALLOW',
    },
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED || false;
};

const showToast = (message = '') => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};

const PAYLOAD = JSON.stringify({username: 'technixia', password: 'automation'});

const BASE_URL = 'http://192.168.4.1/master_login';

export {requestGpsAccess, WIDTH, HEIGHT, showToast, PAYLOAD, BASE_URL};
