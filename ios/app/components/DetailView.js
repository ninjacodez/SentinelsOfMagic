import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, Card } from 'react-native-material-design';
import Header from './Header';
import axios from 'axios';
import styles from '../style';
import config from '../../../config/index.js';

const SERVER_URL = config.WEB_SERVER_URL;

class DetailView extends React.Component {

  constructor(props) {
    super(props);
    const { data } = this.props.navigation.state.params;
    this.state = {
      needtorestock: data.needtorestock,
      hasUsername: data.username,
    };
    // this.handleRestockItem = this.handleRestockItem.bind(this);
    // this.handleClaimItem = this.handleClaimItem.bind(this);
    // this.handleUnclaimItem = this.handleUnclaimItem.bind(this);
    // this.handleUndoItem = this.handleUndoItem.bind(this);
    // this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }



  render() {
    const { data } = this.props.navigation.state.params;
    // <Text>{'id: ' + data.id}</Text>
    // <Text>{'name: ' + data.name}</Text>
    // <Text>{'notes: ' + data.notes}</Text>
    // <Text>{'needtorestock: ' + data.needToRestock}</Text>
    // <Text>{'username: ' + data.username}</Text>
    // <Text>{'userid: ' + data.userId}</Text>
    // <Text>{'itemUserId: ' + data.itemUserId}</Text>
    // <Text>{'image: ' + data.image}</Text>
    return (
      <View style={styles.container}>
        <Image style={{
          width: 150,
          height: 150,
          alignSelf: 'center',
          marginBottom: 20
        }} source={{
          uri: data.image
        }}/>

        {!this.state.needtorestock &&
          <Button
            onPress={() => {
              this.setState({needtorestock: true}, () => data.handleRestockItem());
            }}
            overrides={{textColor: '#ffffff', backgroundColor: '#f37735'}}
            text="Need to Restock"
            raised={true}
        />}
        {(this.state.needtorestock && !this.state.hasUsername) &&
          <Button
            onPress={() => {
              this.setState({hasUsername: true}, () => data.handleClaimItem());
            }}
            overrides={{textColor: '#ffffff', backgroundColor: '#00b159'}}
            text="Claim"
            raised={true}
          />
        }

        {(this.state.needtorestock && this.state.hasUsername) &&
          <Button
              onPress={() => {
                this.setState({hasUsername: false}, () => data.handleUnclaimItem());
              }}
              overrides={{textColor: '#ffffff', backgroundColor: '#ffc425'}}
              text="Unclaim"
              raised={true}
          />
        }
        {this.state.needtorestock && !this.state.hasUsername &&
          <Button
            onPress={() => {
              this.setState({needtorestock: false}, () => data.handleUndoItem());
            }}
            overrides={{textColor: '#ffffff', backgroundColor: '#f37735'}}
            text="Undo"
            raised={true}
        />}
        {this.state.needtorestock && !this.state.hasUsername &&
          <Button
            onPress={data.handleDeleteItem}
            overrides={{textColor: '#ffffff', backgroundColor: '#d11141'}}
            text="Delete"
            raised={true}
        />}
      </View>
    );
  }
}

export default DetailView;
