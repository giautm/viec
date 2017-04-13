/**
 * Copyright 2015-present 650 Industries. All rights reserved.
 *
 * @providesModule Store
 */
'use strict';

import AuthTokenReducer from 'AuthTokenReducer';
import Flux from 'Flux';
import ApolloClient from '../Api/ApolloClient';

import { router as Router} from '../App/navigator';

const reducers = {
  authTokens: AuthTokenReducer,
  apollo: ApolloClient.reducer(),
  nav: (state, action) => Router.getStateForAction(action, state) || state,
};

const store = Flux.createStore(reducers);

export default store;
