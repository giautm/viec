/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule AuthTokenReducer
 */
'use strict';

import AuthTokenActions from 'AuthTokenActions';
import Flux from 'Flux';
import Immutable from 'immutable';

const AuthTokenActionTypes = Flux.getActionTypes(AuthTokenActions);

const AuthTokenState = Immutable.Record({
  idToken: null,
  refreshToken: null,
  accessToken: null,
});

export default Flux.createReducer(new AuthTokenState(), {
  [AuthTokenActionTypes.setAuthTokens](state, action) {
    return new AuthTokenState(action.payload);
  },

  [AuthTokenActionTypes.updateIdToken](state, action) {
    return state.set('idToken', action.payload.idToken);
  },

  [AuthTokenActionTypes.signOut](state, action) {
    return new AuthTokenState();
  },
}, 'authTokensReducer');
