import React from 'react';
import { ScrollView, StyleSheet, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'expo';

export default class AddHabitFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Habit',
  };

  constructor(props) {
    super(props)
    this.state = {
      key: '',
      description: '',
      days: [
        { name: 'Monday', toggled: true },
        { name: 'Tuesday', toggled: true },
        { name: 'Wednesday', toggled: true },
        { name: 'Thursday', toggled: true },
        { name: 'Friday', toggled: true },
        { name: 'Saturday', toggled: true },
        { name: 'Sunday', toggled: true }
      ]
    }
  }

  submitHabit() {
    const { key, description, days } = this.state;
    const { params } = this.props.navigation.state;
    params.addHabit({ key, description, days })
    this.props.navigation.navigate('Habits')
  }

  toggleDay(day) {
    const days = this.state.days.map((d) =>
      (day.name === d.name) ? { name: d.name, toggled: !d.toggled } : d
    )
    this.setState({ days });
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
        {
          this.state.days.map((d) =>
            <TouchableOpacity key={d.name} style={styles.dayToggle} onPress={() => this.toggleDay(d)}>
              <Text>{ d.name }</Text>
              {
                d.toggled &&
                <Icon.Ionicons
                  name="ios-checkmark"
                  size={26}
                />
              }
            </TouchableOpacity>)
        }
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
  dayToggle: {
    margin: 10,
    padding: 10,
    backgroundColor: '#eee'
  }
});
