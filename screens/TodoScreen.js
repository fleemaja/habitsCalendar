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
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { CheckBox } from 'react-native-elements';

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
      ],
      dayString: this.getDayString()
    };
  }

  getDayString() {
    const date = new Date(),
          year = date.getFullYear(),
          month = date.getMonth();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                  'Thursday', 'Friday', 'Saturday'],
          months = ["January", "February", "March",
                    "April", "May", "June", "July",
                    "August", "September", "October",
                    "November", "December"],
          dayIdx = date.getDay(),
          dayOfTheWeek = days[dayIdx],
          monthName = months[month],
          dayOfMonth = date.getDate(),
          nameString = `${dayOfTheWeek} ${monthName} ${dayOfMonth}, ${year}`;
    return nameString;
  }

  _deleteTodo(item) {
    this.setState(prevState => {
      const data = prevState.data.filter((d) => d.key != item.key);
      return { data }
    })
  }

  _editTodo(item, text) {
    this.setState(prevState => {
      const newItem = { ...item, key: text };
      const data = prevState.data.filter((d) => d.key != item.key);
      return { ...data, newItem }
    })
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
    const todoStyles = [styles.label, styles.todoColumn];
    const textStyle = item.completed ? [...todoStyles, styles.completed] : todoStyles;
    return (
      <TouchableOpacity style={styles.row}>
        <CheckBox
          onPress={() => this._toggleCompleted(item)}
          checked={item.completed}
          size={42}
          containerStyle={styles.checkBoxColumn}
        />
        <TextInput
          style={textStyle}
          value={item.key}
          multiline={true}
          maxLength={280}
          returnKeyType="done"
        />
        <CheckBox
          onPress={() => this._deleteTodo(item)}
          iconRight
          iconType='material'
          checkedIcon='clear'
          checkedColor="red"
          checked={true}
          containerStyle={styles.checkBoxColumn}
        />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.todoInfo}>{ this.state.dayString }</Text>
        <Text style={styles.todoInfo}>
          { this.state.data.filter(d => !d.completed).length } TO DO
        </Text>
        {
          this.state.data.length > 0 ? (
            <FlatList
              data={this.state.data}
              extraData={this.state}
              renderItem={({item}) => this._renderTodo(item)}
            />
          ) : (
            <Text>No todos!</Text>
          )
        }
        <TextInput
          style={styles.todoInput}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          onSubmitEditing={() => this.addTodo()}
          placeholder="New Todo"
          maxLength={280}
          returnKeyType="done"
        />
        <KeyboardSpacer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  todoInput: {
    height: 40,
    margin: 20,
    padding: 10,
    borderColor: '#333',
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: '#fff'
  },
  row: {
    margin: 10,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  todoColumn: {
    width: '65%'
  },
  checkBoxColumn: {
    width: '15%'
  },
  completed: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#999',
  },
  label: {
    fontSize: 24,
  },
  todoInfo: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  }
});
