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
      data: [
        { key: 'water the venus fly trap plants', completed: false },
        { key: "brush my hamster's teeth", completed: false },
      ]
    };
  }

  addTodo() {
    const newTodo = { key: this.state.text, completed: false }
    this.setState(prevState => ({
      data: [...prevState.data, newTodo],
      text: ''
    }))
  }

  _toggleCompleted(item) {
    this.setState((prevState) => {
      const toggledData = prevState.data.map((d) =>
        (d.key === item.key) ? { key: d.key, completed: !d.completed } : d
      )
      return { data: toggledData }
    })
  }

  _renderTodo(item) {
    const textStyle = item.completed ? [styles.label, styles.completed] : [styles.label];
    return (
      <TouchableOpacity style={styles.row} onPress={() => this._toggleCompleted(item)}>
        <Text style={textStyle}>{item.key}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          extraData={this.state}
          renderItem={({item}) => this._renderTodo(item)}
        />
        <TextInput
          style={styles.todoInput}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          onSubmitEditing={() => this.addTodo()}
          placeholder="New Todo"
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
    margin: 10,
  },
  todoInput: {
    height: 40,
    margin: 20,
    padding: 10,
    borderColor: 'blue',
    borderRadius: 10,
    borderWidth: 2
  },
  row: {
    margin: 5,
    padding: 5,
    borderWidth: 1,
    backgroundColor: '#fff'
  },
  completed: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  label: {
    fontSize: 24,
  },
});
