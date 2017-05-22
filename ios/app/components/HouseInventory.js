import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import InventoryListView from './InventoryListView';
import dummyData from '../../../database/dummyData.js';
import config from '../../../config/index.js';
import styles from '../style';

class HouseInventory extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => {
    const onPressAddItemView = () => {
      const { navigate } = navigation;
      navigate('AddItem', screenProps);
    }

    return {
      title: 'House Inventory',
      headerRight:
      (
        <TouchableOpacity onPress={onPressAddItemView}>
          <Image
            style={[styles.header, {tintColor: '#0e7afe'}]}
            source={require('../img/add.png')}
          />
        </TouchableOpacity>
      )
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      items: dummyData
    };
    this.getItems = this.getItems.bind(this);
    this.props.screenProps.getItems = this.getItems;
  }

  getItems() {
    axios.post(config.WEB_SERVER_URL + '/inventory', this.props.screenProps )
    .then(res => {
      console.log('Successful POST request to /inventory - house inventory items retrieved', res.data);
      const sortedData = res.data.sort((a, b) => a.id - b.id);
      this.setState({items: sortedData}, console.log('state^^^^^^^^^^^^', this.state.items));
    })
    .catch(err => console.log('Unsuccessful POST request to /inventory - unable to retrieve house inventory items: ', err));
  }

  componentDidMount() {
    this.getItems();
  }

  render() {
    return (
      <InventoryListView
        navigation={this.props.navigation}
        headerTitle={'House Inventory'}
        listViewData={this.state.items}
        screenProps={this.props.screenProps}
        getItems={this.getItems}
      />
    );
  }
}

export default HouseInventory;
