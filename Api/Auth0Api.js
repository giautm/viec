/* @flow */

import jwtDecode from 'jwt-decode';
import { Constants } from 'expo';

const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID || 'RGl9XDMBvSwaHqilBjALqej9axJuAEGt';
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || 'tiki-tex-uat.auth0.com';
const AUTH0_SCOPE = 'openid offline_access nickname username';
const SIGN_UP_ENDPOINT = 'https://exp.host/--/api/v2/auth/createOrUpdateUser';

async function signInAsync(username: String, password: String) {
  let response = await fetch(`https://${AUTH0_DOMAIN}/oauth/ro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'client_id': AUTH0_CLIENT_ID,
      'username': username,
      'password': password,
      'device': Constants.deviceId,
      'connection': 'Username-Password-Authentication',
      'scope': AUTH0_SCOPE,
    })
  });

  let result = await response.json();
  return result;
}

async function signUpAsync(data: Object) {
  let response = await fetch(SIGN_UP_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'userData': {
        'client_id': AUTH0_CLIENT_ID,
        'connection': 'Username-Password-Authentication',
        'email': data.email,
        'password': data.password,
        'username': data.username,
        'user_metadata': {
          'onboarded': true,
          'given_name': data.firstName,
          'family_name': data.lastName,
        },
      }
    }),
  });

  let result = await response.json();
  return result;
}

async function fetchUserProfileAsync(token: String) {
  let response = await fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  let result = await response.json();
  return result;
}

function tokenIsExpired(idToken: String) {
  const { exp } = jwtDecode(idToken, { complete: true });
  return exp - ((new Date()).getTime() / 1000) <= 60 * 60;
}

async function refreshIdTokenAsync(refreshToken: ?String) {
  let response = await fetch(`https://${AUTH0_DOMAIN}/delegation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'refresh_token': refreshToken,
      'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      'api_type': 'app',
      'scope': AUTH0_SCOPE,
      'client_id': AUTH0_CLIENT_ID,
      'target': AUTH0_CLIENT_ID,
    })
  });

  let result = await response.json();
  return result;
}

export default {
  signInAsync,
  signUpAsync,
  fetchUserProfileAsync,
  refreshIdTokenAsync,
  tokenIsExpired,
};
