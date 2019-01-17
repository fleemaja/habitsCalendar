import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class MoodScreen extends React.Component {
  static navigationOptions = {
    title: 'Mood Calendar',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>
          This will be a mood calendar. The calendar will be editable and notes
          will be viewable and addable.
        </Text>
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
