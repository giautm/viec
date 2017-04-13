/* @flow */
import React from 'react';
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { Font } from 'expo';
import { addNavigationHelpers } from 'react-navigation';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import SentryClient from '@expo/sentry-utils';
import moment from 'moment';

const viLocale = require('moment/locale/vi');
moment.locale('vi', viLocale);

import Store from '../Flux/Store';
import AuthTokenActions from '../Flux/AuthTokenActions';
import LocalStorage from '../Storage/LocalStorage';
import ApolloClient from '../Api/ApolloClient';
import AppNavigator from './navigator';

import registerForPushNotificationsAsync from '../Api/registerForPushNotificationsAsync';

import packageJSON from './../package.json';

const SENTRY_API_KEY = 'a993a0483e434eaabad7e9763dd81254';
const SENTRY_PROJECT = '156904';

SentryClient.setupSentry(
  `https://${SENTRY_API_KEY}@sentry.io/${SENTRY_PROJECT}`,
  packageJSON.version,
  packageJSON.main,
);

export default class WrapWithStore extends React.Component {
  render() {
    return (
      <ApolloProvider client={ApolloClient} store={Store}>
        <AppContainer/>
      </ApolloProvider>
    );
  }
};

@connect((data) => AppContainer.getDataProps(data))
export class AppContainer extends React.Component {
  state = {
    isReady: false,
  };

  static getDataProps = (data) => {
    return {
      nav: data.nav,
    };
  };

  async componentDidMount() {
    try {
      let storedAuthTokens = await LocalStorage.getAuthTokensAsync();
      if (storedAuthTokens) {
        Store.dispatch(AuthTokenActions.setAuthTokens(storedAuthTokens));
      }

      if (Platform.OS === 'ios') {
        await Font.loadAsync(Ionicons.font);
      } else {
        await Font.loadAsync({
          ...Ionicons.font,
          ...MaterialIcons.font,
        });
      }
      registerForPushNotificationsAsync();

      // Handle notifications that are received or selected while the app
      // is open. If the app was closed and then opened by tapping the
      // notification (rather than just tapping the app icon to open it),
      // this function will fire on the next tick after the app starts
      // with the notification data.
      this._notificationSubscription = Notifications.addListener(this._handleNotification);
    } catch (e) {
    } finally {
      this.setState({ isReady: true });
    }
  }

  _handleNotification = (notification) => {
    this.setState({ notification: notification });
  };

  render() {
    if (this.state.isReady) {
      return (
        <View style={styles.container}>
          <ActionSheetProvider>
            <AppNavigator navigation={addNavigationHelpers({
              dispatch: this.props.dispatch,
              state: this.props.nav,
            })} />
          </ActionSheetProvider>

          {/* {Platform.OS === 'ios' && <GlobalLoadingOverlay />} */}
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        </View>
      );
    }

    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
