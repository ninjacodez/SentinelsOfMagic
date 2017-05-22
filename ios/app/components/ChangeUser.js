import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { Button, Card } from 'react-native-material-design';
import { TextField } from 'react-native-material-textfield';
import axios from 'axios';
import ModalDropdown from 'react-native-modal-dropdown';
import styles from '../style';
import config from '../../../config/index.js';

class ChangeUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernames: [],
      userArray: []
    }
    this.onPressUser = this.onPressUser.bind(this);
  }

  static navigationOptions = { title: 'Change User' };

  componentDidMount() {
    const { navigate } = this.props.navigation;

    axios.post(config.WEB_SERVER_URL + '/users', this.props.screenProps)
    .then((response) => {
      if (response && response.data.length > 0) {
        console.log('success@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', response.data);
        let usernames = response.data.map(user => user.username);
        this.setState({
          userArray: response.data,
          usernames: usernames
        });
      } else {
        throw new Error('no existing users');
      }
    })
    .catch((err) => {
      console.log('Error occurred during login:', err);
    });
  }

  onPressUser (index) {
    const { navigate, goBack, dispatch } = this.props.navigation;

    const userId = this.state.userArray[index].id;
    const houseId = this.state.userArray[0].house_id;

    const params = {
      userId: userId,
      houseId: houseId
    }

    this.props.screenProps.navInMain('Main', params);
  }

  render() {
    return (
      <View style={styles.createUser}>
        <ModalDropdown
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownBox}
          options={this.state.usernames}
          onSelect={this.onPressUser}
        />
      </View>
    );
  }
}

export default ChangeUser;
