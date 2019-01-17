import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer'

export default class TodoScreen extends React.Component {
  static navigationOptions = {
    title: 'To Do List',
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      placeholder: 'New Todo',
      data: [
        { key: 'water the venus fly trap plants' },
        { key: "brush my hamster's teeth" },
      ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => <Text>{item.key}</Text>}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder={this.state.placeholder}
          maxLength={280}
        />
        <KeyboardSpacer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
