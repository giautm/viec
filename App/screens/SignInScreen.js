import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import {
  ActionsContainer,
  Button,
  FieldsContainer,
  Fieldset,
  Form,
  FormGroup,
  Label,
} from 'react-native-clean-form';
import {
  Input,
  Select,
  Switch,
} from 'react-native-clean-form/redux-form-immutable';
import { reduxForm } from 'redux-form/immutable';

import AuthTokenActions from '../../Flux/AuthTokenActions';
import Auth0Api from '../../Api/Auth0Api';

class FormView extends Component {
  static getDataProps(data) {
    return {
      authTokens: data.authTokens,
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.authTokens.idToken && !this.props.authTokens.isToken) {
//       TextInput.State.blurTextInput(TextInput.State.currentlyFocusedField());
// //      this.props.navigation.dismissModal();
//     }
//   }

  _handleError = (error) => {
    console.log(error);
    let message = error.error_description
      || error.message
      || 'Sorry, something went wrong.';
    this.dropdown.alertWithType('error', 'Error', message)
  };

  onSignIn = async (values, dispatch) => {
    try {
      let result = await Auth0Api.signInAsync(
        values.get('email'), values.get('password'));
      if (this._isMounted) {
        if (result.error) {
          this._handleError(result);
        } else {
          let profile = await Auth0Api.fetchUserProfileAsync(result.access_token);
          this.dropdown.dismiss();
          dispatch(AuthTokenActions.signIn({
            refreshToken: result.refresh_token,
            accessToken: result.access_token,
            idToken: result.id_token,
          }, profile));
        }
      }
    } catch (e) {
      console.log(e);
      this._isMounted && this._handleError(e);
    }
  };

  render() {
    const { handleSubmit, submitting } = this.props

    return (
      <Form>
        <FieldsContainer>
          <Fieldset label={'Đăng nhập vào Việc'} last>
            <Input name="email" label="Địa chỉ email" placeholder="email@example.com" keyboardType="email-address" returnKeyType="next" blurOnSubmit={false} />
            <Input name="password" label="Mật khẩu" placeholder="password" secureTextEntry/>
          </Fieldset>
        </FieldsContainer>
        <ActionsContainer>
          <Button
            icon="md-checkmark"
            iconPlacement="right"
            onPress={handleSubmit(this.onSignIn)}
            submitting={submitting}
            >Đăng nhập</Button>
        </ActionsContainer>
        <DropdownAlert
          ref={(ref) => this.dropdown = ref}/>
      </Form>
    );
  }
}

export default connect((data) => FormView.getDataProps(data))
(reduxForm({
  form: 'signIn',
  validate: (values) => {
    const errors = {};

    if (!values.get('email')) {
      errors.email = 'Tên đăng nhập là bắt buộc.'
    }
    if (!values.get('password')) {
      errors.password = 'Mật khẩu là bắt buộc.'
    }

    return errors
  }
})(FormView));
