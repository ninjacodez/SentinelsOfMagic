import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Navigator } from 'react-native';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f37735',
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
  }
  // componentWillReceiveProps(props) {
  //   props.getItems();
  // }
  render() {
    // const {navigate} = this.props.navigation;
    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('Detail', { data: this.props })}>
        <View style={styles.row}>
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
