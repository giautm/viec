/* @flow */
import {
  StackNavigator,
  TabNavigator,
  TabView,
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
  qrCode: {
    screen: QRCodeScreen,
  },
  signIn: {
    screen: SignInScreen,
  },
  signUp: {
    screen: SignUpScreen,
  },
}, {
  tabBarComponent: TabView.TabBarBottom,
  tabBarPosition: 'bottom',
});

const SimpleApp = StackNavigator({
  rootNavigation: {
    screen: MainScreenNavigator,
  },
  check: {
    screen: CheckScreen,
  },
  modal: {
    screen: ModalScreen,
  },
  signIn: {
    screen: SignInScreen,
  },
}, {
  headerMode: 'screen',
  cardStyle: {
    backgroundColor: '#fff',
  },
});

export default SimpleApp;
