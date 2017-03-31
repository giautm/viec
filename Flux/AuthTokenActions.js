/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule AuthTokenActions
 */
'use strict';

import { action } from 'Flux';
import LocalStorage from '../Storage/LocalStorage';
import ApolloClient from '../Api/ApolloClient';

let AuthTokenActions = {
  signIn(tokens) {
    ApolloClient.resetStore();
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
    return null;
  },
};

export default AuthTokenActions;
