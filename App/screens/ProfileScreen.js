/* @flow */

import React from 'react';
import {
  Alert,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  findNodeHandle,

} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { connectActionSheet } from '@expo/react-native-action-sheet';

import AuthTokenActions from '../../Flux/AuthTokenActions';

import Colors from '../constants/Colors';

import ShiftHistory from '../components/ShiftHistory';

import onlyIfAuthenticated from '../utils/onlyIfAuthenticated';
import isUserAuthenticated from '../utils/isUserAuthenticated';

@connect((data, props) => ProfileScreen.getDataProps(data, props))
export default class ProfileScreen extends React.Component {
  static route = {
    navigationBar: {
      title(params) {
        if (params.username) {
          return params.username;
        } else {
          return 'Profile';
        }
      },
      ...Platform.select({
        ios: {
          renderRight: ({ params }) => {
            if (params.username) {
              return <OptionsButtonIOS />;
            } else {
              return <SignOutButtonIOS />;
            }
          },
        },
        android: {
          renderRight: ({ params }) => {
            if (params.username) {
              return <OptionsButtonAndroid />;
            } else {
              return <SignOutButtonAndroid />;
            }
          },
        },
      }),
    },
  };

  static getDataProps(data, props) {
    let isAuthenticated = isUserAuthenticated(data.authTokens);
    let isOwnProfile = !props.username || true
      // isCurrentUser(data.authTokens, props.username);

    return {
      isAuthenticated,
      isOwnProfile,
    };
  }

  render() {
    return <ShiftHistory/>;
  }
}

@onlyIfAuthenticated
@connect()
class SignOutButtonAndroid extends React.Component {
  _anchor: View;

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          collapsable={false}
          ref={view => {
            this._anchor = view;
          }}
          style={{ position: 'absolute', top: 5, left: 0 }}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this._handlePress}>
          <MaterialIcons name="more-vert" size={27} color="#4E9BDE" />
        </TouchableOpacity>
      </View>
    );
  }

  _handlePress = () => {
    let handle = findNodeHandle(this._anchor);
    NativeModules.UIManager.showPopupMenu(handle, ['Sign out'], err => {}, (
      action,
      selectedIndex,
    ) => {
      if (selectedIndex === 0) {
        this.props.dispatch(AuthTokenActions.signOut());
      }
    });
  };
}

class OptionsButtonAndroid extends React.Component {
  _anchor: View;

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          collapsable={false}
          ref={view => {
            this._anchor = view;
          }}
          style={{ position: 'absolute', top: 5, left: 0 }}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this._handlePress}>
          <MaterialIcons name="more-vert" size={27} color="#4E9BDE" />
        </TouchableOpacity>
      </View>
    );
  }

  _handlePress = () => {
    let handle = findNodeHandle(this._anchor);
    NativeModules.UIManager.showPopupMenu(
      handle,
      ['Report this user'],
      err => {},
      (action, selectedIndex) => {
        if (selectedIndex === 0) {
          Alert.alert(
            'Thank you for your report',
            'We will investigate the case as soon as we can.',
          );
        }
      },
    );
  };
}

@onlyIfAuthenticated
@connect()
class SignOutButtonIOS extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={this._handlePress}>
        <Text style={{ fontSize: 16, color: '#4E9BDE' }}>
          Sign Out
        </Text>
      </TouchableOpacity>
    );
  }

  _handlePress = () => {
    this.props.dispatch(AuthTokenActions.signOut());
  };
}

@connectActionSheet
class OptionsButtonIOS extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={this._handlePress}>
        <Ionicons name="ios-more" size={27} color="#4E9BDE" />
      </TouchableOpacity>
    );
  }

  _handlePress = () => {
    let options = ['Report this user', 'Cancel'];
    let cancelButtonIndex = 1;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async buttonIndex => {
        if (buttonIndex === 0) {
          Alert.alert(
            'Thank you for your report',
            'We will investigate the case as soon as we can.',
          );
        }
      },
    );
  };
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 15,
  },
});
