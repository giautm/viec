/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule Store
 */
'use strict';

import { combineReducers } from 'redux-immutablejs';
import { reducer as form } from 'redux-form/immutable';

import AuthTokenReducer from 'AuthTokenReducer';
import Flux from 'Flux';
import ApolloClient from '../Api/ApolloClient';

import AppNavigator from '../App/navigator';

const reducers = {
  authTokens: AuthTokenReducer,
  apollo: ApolloClient.reducer(),
  form,
  nav: (state, action) => AppNavigator.router.getStateForAction(action, state) || state,
};

const store = Flux.createStore(reducers);

export default store;
