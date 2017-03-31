/* @flow */

import { createNetworkInterface } from 'apollo-client';
import ConnectivityAwareHTTPNetworkInterface from './ConnectivityAwareHTTPNetworkInterface';

type AuthAwareNetworkInterfaceOptions = {
  getIdToken: () => string,
  setIdToken: (idToken: string) => void,
  getRefreshToken: () => string,
  idTokenIsValid: () => bool,
  refreshIdTokenAsync: () => string,
}

class AuthAwareNetworkInterface {
  _requestQueue = [];

  _networkInterface: ConnectivityAwareHTTPNetworkInterface;
  _getIdToken: () => string;
  _setIdToken: (idToken: string) => void;
  _getRefreshToken: () => string;
  _idTokenIsValid: () => bool;
  _refreshIdTokenAsync: () => string;

  constructor(uri: string, options: AuthAwareNetworkInterfaceOptions = {}) {
    this._networkInterface = new ConnectivityAwareHTTPNetworkInterface(uri, options);
    this._getIdToken = options.getIdToken;
    this._setIdToken = options.setIdToken;
    this._getRefreshToken = options.getRefreshToken;
    this._idTokenIsValid =  options.idTokenIsValid;
    this._refreshIdTokenAsync = options.refreshIdTokenAsync;

    this._applyAuthorizationHeaderMiddleware();
  }

  _applyAuthorizationHeaderMiddleware = () => {
    this._networkInterface.use([{
      applyMiddleware: (req, next) => {
        if (!req.options.headers) {
          req.options.headers = {};
        }

        const idToken = this._getIdToken();
        if (idToken) {
          req.options.headers['Authorization'] = `Bearer ${idToken}`;
        }

        next();
      }
    }]);
  }

  query(request) {
    if (this._idTokenIsValid() || !this._getIdToken()) {
      return this._networkInterface.query(request);
    } else {
      // Throw it into the queue
      return new Promise(async (resolve, reject) => {
        this._requestQueue.push(() => {
          this._networkInterface.query(request).then(resolve).catch(reject);
        });

        // If it's the first one thrown into the queue, refresh token
        if (this._requestQueue.length === 1) {
          let newIdToken = await this._refreshIdTokenAsync();
          this._setIdToken(newIdToken);
          this._flushRequestQueue();
        }
      });
    }
  }

  _flushRequestQueue() {
    this._requestQueue.forEach((queuedRequest) => queuedRequest());
    this._requestQueue = [];
  }

  use(middleware) {
    return this._networkInterface.use(middleware);
  }

  useAfter(afterware) {
    return this._networkInterface.useAfter(afterware);
  }
}

export default function createAuthAwareNetworkInterface(options = {}) {
  let { uri, ...otherOptions } = options;

  return new AuthAwareNetworkInterface(uri, otherOptions);
}
