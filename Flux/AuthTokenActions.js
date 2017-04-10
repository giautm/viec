/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule AuthTokenActions
 */
'use strict';

import { action } from 'Flux';
import SentryClient from '@expo/sentry-utils';
import LocalStorage from '../Storage/LocalStorage';
import ApolloClient from '../Api/ApolloClient';

let AuthTokenActions = {
  signIn(tokens, profile = {}) {
    ApolloClient.resetStore();
    SentryClient.setUserContext(profile);
    return AuthTokenActions.setAuthTokens(tokens);
  },

  @action setAuthTokens(tokens) {
    LocalStorage.saveAuthTokensAsync(tokens);
    return tokens;
  },

  @action updateIdToken(idToken) {
    LocalStorage.updateIdTokenAsync(idToken);
    return { idToken };
  },

  @action signOut() {
    LocalStorage.removeAuthTokensAsync();
    LocalStorage.clearHistoryAsync();
    ApolloClient.resetStore();
    SentryClient.setUserContext();
    return null;
  },
};

export default AuthTokenActions;
