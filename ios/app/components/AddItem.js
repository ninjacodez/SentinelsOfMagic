import React, { Component } from 'react';
import { Text, View, TextInput, Image, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button as MDButton, Card } from 'react-native-material-design';
import { TextField } from 'react-native-material-textfield';
import Main from './Main';
import axios from 'axios';
import styles from '../style';
import config from '../../../config/index.js';

class AddItem extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {

    const onPressScan = () => {
      const { navigate } = navigation;
      navigate('Camera', screenProps);
    }
    return {
      headerRight:
      (<Button
        onPress={onPressScan}
        title="Scan"
        style={styles.header}
      />),
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      notes: '',
      errorName: '',
      errorText: '',
      image: ''
    }
    this.onPressSubmit = this.onPressSubmit.bind(this);
    // this.onPressScan = this.onPressScan.bind(this);
    this.searchUPC = this.searchUPC.bind(this);
    this.props.screenProps.searchUPC = this.searchUPC;
  }

  onPressSubmit() {
    const { navigate, goBack } = this.props.navigation;
    const { houseId, userId } = this.props.screenProps;

    const params = {
      name: this.state.name,
      notes: this.state.notes,
      image: this.state.image,
      houseId: houseId,
      userId: userId
    };

    axios.post(config.WEB_SERVER_URL + '/add', params)
    .then(res => {
      this.props.screenProps.getItems();
    })
    .then(() => {
      goBack();
    })
    .catch(err => {
      console.log('Bad POST request to /add: ', err.response.data);
      this.setState({
        errorName: err.response.data.name,
        errorNotes: err.response.data.notes
      });
    });
  }

  searchUPC(upc) {
    console.log('from searchUPC', upc);
    return axios({
      method: 'post',
      url: config.WEB_SERVER_URL + '/itemLookup',
      params: {
        upc: 813700020151
      }
    }).then((data) => {
      return this.setState({
        name: data.data.name,
        image: data.data.image,
        notes: 'Brand: ' + data.data.notes
      });
    }).catch((err) => {
      console.log('ERROR: ', err);
    });
  }

  render() {
    const image = (this.state.image !== '' ?
    (<Image style={{
      width: 200,
      height: 200,
      alignSelf: 'center'
    }} source={{
      uri: this.state.image
    }}/> )
    : ( <View></View> ));

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {image}
          <Text style={styles.welcome}>
            Add New Item
          </Text>
          <TextField
            label="New Item"
            textColor="#ffffff"
            tintColor="#ffffff"
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            autoCorrect={false}
          />
          <TextField
            label="Notes"
            textColor="#ffffff"
            tintColor="#ffffff"
            multiline={true}
            onChangeText={(notes) => this.setState({notes})}
            value={this.state.notes}
          />
          <MDButton
            onPress={this.onPressSubmit}
            overrides={{textColor: '#ffffff', backgroundColor:'#f37735'}}
            text="Submit"
            raised={true}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default AddItem;
