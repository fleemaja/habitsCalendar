import React from 'react';
import { ScrollView, StyleSheet, Text, Button, FlatList } from 'react-native';

export default class HabitsScreen extends React.Component {

  static navigationOptions = {
    title: 'Habits',
  };

  constructor(props) {
    super(props)
    this.state = {
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

  addHabit(habit) {
    this.setState(prevState => (
      { data: [habit, ...prevState.data] }
    ))
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => <Text>{item.key} - {item.description}</Text>}
          />
        <Button
          title="Add New Habit"
          onPress={() => this.props.navigation.navigate('AddHabitForm', {
            addHabit: this.addHabit.bind(this)
          })}
        />
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
});
