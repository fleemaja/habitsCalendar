import React from 'react';
import { ScrollView, StyleSheet, TextInput, Button } from 'react-native';

export default class AddHabitFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Habit',
  };

  constructor(props) {
    super(props)
    this.state = {
      key: '',
      description: ''
    }
  }

  submitHabit() {
    const key = this.state.key;
    const description = this.state.description;
    const { params } = this.props.navigation.state;
    params.addHabit({ key, description })
    this.props.navigation.navigate('Habits')
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TextInput
          placeholder="Habit"
          onChangeText={(key) => this.setState({ key })}
        />
        <TextInput
          placeholder="Description"
          onChangeText={(description) => this.setState({ description })}
        />
        <Button title="Add Habit" onPress={() => this.submitHabit()} />
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
