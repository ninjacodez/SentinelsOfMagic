import React from 'react';
import { ListView, Text, View, StyleSheet } from 'react-native';
import Row from './Row';
import Header from './Header';
import styles from '../style';

import spoonSampleData from '../spoonSampleData';
import dummyData from '../../../database/dummyData.js';

class InventoryListView extends React.Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillReceiveProps(props) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(props.listViewData),
    });
  }

  renderSeparator(sectionID, rowID) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={styles.separator}
      />
    );
  }

  render() {
    return (
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(data) => (
            <Row
              {...data}
              navigation={this.props.navigation}
              getItems={this.props.getItems}
              screenProps={this.props.screenProps}
            />
          )}
          renderSeparator={this.renderSeparator}
          // renderHeader={() => <Header />}
        />
    );
  }

}

export default InventoryListView;
