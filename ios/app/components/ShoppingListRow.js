import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Navigator } from 'react-native';
// import styles from '../style';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#00b159',
    shadowColor: '#666',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  rowHighlighted: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#d11141',
    shadowColor: '#666',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  text: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

class ShoppingListRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHighlighted: false,
    };
  }

  render() {
    // const {navigate} = this.props.navigation;
    return (
      <TouchableHighlight onPress={() => {
        this.props.handleClickRow(this.props, this.state.isHighlighted);
        this.setState({isHighlighted: !this.state.isHighlighted});
      }}>
        <View style={this.state.isHighlighted ? styles.rowHighlighted : styles.row}>
          <Image source={{uri: this.props.image}} style={styles.photo}/>
          <Text style={styles.text}>
            {'item: ', this.props.houses_items_id, ', id - ', this.props.id, ', name - ', this.props.itemname}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default ShoppingListRow;
