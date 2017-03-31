/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule Store
 */
'use strict';

import AuthTokenReducer from 'AuthTokenReducer';
import Flux from 'Flux';
import ApolloClient from '../Api/ApolloClient';

let reducers = {
  authTokens: AuthTokenReducer,
  apollo: ApolloClient.reducer(),
};

let store = Flux.createStore(reducers);

export default store;
