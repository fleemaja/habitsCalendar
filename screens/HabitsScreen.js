import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class HabitsScreen extends React.Component {
  static navigationOptions = {
    title: 'Habits',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>This is where habits will be listed. The habits will be editable, deletable, and viewable in their own links.</Text>
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
