/* @flow */
import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation';

import ProfileScreen from '../screens/ProfileScreen';
import EmployeeProfileScreen from '../screens/EmployeeProfileScreen';
import CheckScreen from '../screens/CheckScreen';
import ModalScreen from '../screens/ModalScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import QRCodeScreen from '../screens/QRCodeScreen';


const MainScreenNavigator = TabNavigator({
  profile: {
    screen: ProfileScreen,
  },
  employee: {
    screen: EmployeeProfileScreen,
  },
});

const SimpleApp = StackNavigator({
  check: {
    screen: CheckScreen,
  },
  modal: {
    screen: ModalScreen,
  },
  signIn: {
    screen: SignInScreen,
  },
  signUp: {
    screen: SignUpScreen,
  },
  qrCode: {
    screen: QRCodeScreen,
  },
  rootNavigation: {
    screen: MainScreenNavigator,
  },
});

export default SimpleApp;
