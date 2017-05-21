import React from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Image, TouchableHighlight, Navigator } from 'react-native';
import config from '../../../config/index.js';

const SERVER_URL = config.WEB_SERVER_URL;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f37735',
  },
  needtorestockrow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#d11141',
  },
  claimedrow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#708090',
  },
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 18,
    color: '#ffffff'
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: this.props.name,
      notes: this.props.notes,
      needtorestock: this.props.needtorestock,
      username: this.props.username,
      userId: this.props.screenProps.userId,
      itemUserId: this.props.userid,
      image: this.props.image
    };
    this.handleRestockItem = this.handleRestockItem.bind(this);
    this.handleClaimItem = this.handleClaimItem.bind(this);
    this.handleUnclaimItem = this.handleUnclaimItem.bind(this);
    this.handleUndoItem = this.handleUndoItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  handleRestockItem() {
    axios.post(SERVER_URL + '/restock', { itemId: this.state.id })
      .then(res => {
        console.log('Successful POST request to /restock');
        this.setState({
          needtorestock: true,
        }, () => {
          this.props.getItems();
          // this.props.screenProps.forceRenderInMain();
        });
      })
      .catch(err => console.log('Bad POST request to /restock: ', err));
  }

  handleClaimItem() {
    axios.post(SERVER_URL + '/claim', { itemId: this.state.id, userId: this.state.userId })
      .then(res => {
        console.log('Successful POST request to /claim');
        this.setState({
          username: res.data.username,
          itemUserId: this.state.userId,
        }, () => {
          this.props.getItems();
          this.props.screenProps.forceRenderInMain();
        });
      })
      .catch(err => console.log('Bad POST request to /claim: ', err));
  }

  handleUnclaimItem() {
    axios.post(SERVER_URL + '/unclaim', { itemId: this.state.id })
      .then(res => {
        console.log('Successful POST request to /unclaim');
        this.setState({
          username: null,
        }, () => {
          this.props.getItems();
          this.props.screenProps.forceRenderInMain();
        });
      })
      .catch(err => console.log('Bad POST request to /unclaim'));
  }

  handleUndoItem() {
    axios.post(SERVER_URL + '/undo', { itemId: this.state.id })
      .then(res => {
        console.log('Successful POST request to /unclaim');
        this.setState({
          needtorestock: false,
        }, () => {
          this.props.getItems();
          // this.props.screenProps.forceRenderInMain();
        });
      })
      .catch(err => console.log('Bad POST request to /unclaim'));
  }

  handleDeleteItem() {
    // const { data } = this.props.navigation.state.params;
    // const { goBack } = this.props.navigation;
    // console.log('************ DELETE ************', data.name);
    axios.post(SERVER_URL + '/delete', { itemId: this.state.id })
      .then(res => {
        console.log('Successful POST request to /delete');
        this.props.getItems();
        // this.props.navigation.goBack();
        this.props.screenProps.forceRenderInMain();
      })

      .catch(err => console.log('Bad POST request to /delete'));
  }
  // componentWillReceiveProps(props) {
  //   props.getItems();
  // }
  render() {
    // const {navigate} = this.props.navigation;
    return (
      <TouchableHighlight
      onPress={() => this.props.navigation.navigate('Detail',
      { data:
        {...this.state,
          handleRestockItem: this.handleRestockItem,
          handleClaimItem: this.handleClaimItem,
          handleUnclaimItem: this.handleUnclaimItem,
          handleUndoItem: this.handleUndoItem,
          handleDeleteItem: this.handleDeleteItem,
        }
      })}>
        <View style={this.props.needtorestock ? (this.props.username ? styles.claimedrow : styles.needtorestockrow) : styles.row}>
          <Image source={{uri: this.props.image}} style={styles.photo}/>
          <Text style={styles.text}>
            {this.props.name}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default Row;
