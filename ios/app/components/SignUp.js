import React, { Component } from 'react';
import { Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, Card } from 'react-native-material-design';
import { TextField } from 'react-native-material-textfield';
import axios from 'axios';
import CreateUser from './CreateUser';
import styles from '../style';
import config from '../../../config/index.js';

class SignUp extends Component {

  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      houseName: '',
      password: '',
      error: null,
      errorColor: "#d50032"
    };
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.onPressLogin = this.onPressLogin.bind(this);
  }

  onPressLogin() {
    const { navigate } = this.props.navigation;
    navigate('Login');
  }

  onPressSubmit() {
    const { navigate, state } = this.props.navigation;

    const houseName = this.state.houseName;
    const password = this.state.password;

    axios.post(config.WEB_SERVER_URL + '/auth/signup', {
      houseName: houseName,
      password: password
    })
    .then((response) => {
      console.log('Sign up success');
      this.setState({
        error: 'Signed Up Successfully',
        errorColor: '#99ff99'
      }, setTimeout(() => { navigate('Login'); }, 1000)
      );
    })
    .catch((err) => {
      console.log('Error occurred during signup:', err.response.data.message);
      this.setState({
        error: err.response.data.message,
        errorColor: "#d50032"
      })
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.loading}>
            Sign Up
          </Text>
          <TextField
            label="House Name"
            textColor="#ffffff"
            tintColor="#ffffff"
            onChangeText={(houseName) => this.setState({houseName})}
            value={this.state.houseName}
            autoCorrect={false}
            error={this.state.error}
            errorColor={this.state.errorColor}
          />
          <TextField
            label="Password"
            textColor="#ffffff"
            tintColor="#ffffff"
            onChangeText={(password) => this.setState({password})}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            error={this.state.error}
            errorColor={this.state.errorColor}
          />
          <View style={styles.button}>
            <Button
              onPress={this.onPressSubmit}
              overrides={{textColor: '#ffffff', backgroundColor:'#f37735'}}
              text="Sign Up"
              raised={true}
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={this.onPressLogin}
              overrides={{textColor: '#ffffff', backgroundColor:'#ffc425'}}
              text="Go to Login"
              raised={true}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default SignUp;
