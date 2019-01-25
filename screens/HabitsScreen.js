import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, FlatList } from 'react-native';

export default class HabitsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Habits',
      headerLeft: (
        <Button
          onPress={() => params.toggleEdit()}
          title="Edit"
        />
      ),
      headerRight: (
        <Button
          onPress={() => navigation.navigate('AddHabitForm', {
            addHabit: params.addHabit
          })}
          title="Add"
        />
      ),
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
      data: [
        {
          key: "Floss",
          description: "I need to start flossing everyday to avoid cavities in between my teeth"
        },
        {
          key: "Meditation",
          description: "I want to meditate everyday to improve my focus and self-control"
        }
      ]
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      addHabit: this.addHabit.bind(this),
      toggleEdit: this.toggleEdit.bind(this)
    });
  }

  addHabit(habit) {
    this.setState(prevState => (
      { data: [habit, ...prevState.data] }
    ))
  }

  toggleEdit() {
    this.setState(prevState => (
      { editMode: !prevState.editMode }
    ))
  }

  _deleteItem(item) {
    this.setState(prevState => {
      const data = prevState.data.filter((d) => d.key != item.key);
      return { data }
    })
  }

  _renderHabitRow(item) {
    return (
      <View>
        <TouchableOpacity style={styles.row}
          onPress={() => this.props.navigation.navigate('HabitDetail', {item})}>
          <Text style={styles.label}>{item.key}</Text>
          <Text style={styles.description}>{item.description}</Text>
          {
            (this.state.editMode) &&
            (<Button
              onPress={() => this._deleteItem(item)}
              title="DELETE"
              color="#ff0000" />)
          }
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.data}
          extraData={this.state}
          renderItem={({item}) => this._renderHabitRow(item)}
          />
        {
          (this.state.data.length === 0) &&
            (
              <View>
                <Text>No habits added yet!</Text>
                <Button
                  title="Add New Habit"
                  onPress={() => this.props.navigation.navigate('AddHabitForm', {
                    addHabit: this.addHabit.bind(this)
                  })}
                />
              </View>
          )
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  row: {
    margin: 5,
    padding: 5,
    borderWidth: 1,
    backgroundColor: '#fff'
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 16
  }
});
