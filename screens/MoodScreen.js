import React from 'react';
import { ScrollView, StyleSheet, Text, FlatList } from 'react-native';

export default class MoodScreen extends React.Component {
  static navigationOptions = {
    title: 'Mood Calendar'
  };

  constructor(props) {
    super(props)
    this.state = {
      data: this.getDays()
    }
  }

  getDayObject(d) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                  'Thursday', 'Friday', 'Saturday'],
          months = ["January", "February", "March",
                    "April", "May", "June", "July",
                    "August", "September", "October",
                    "November", "December"];
          dayIdx = d.getDay(),
          dayOfTheWeek = days[dayIdx],
          monthName = months[d.getMonth()],
          dayOfMonth = d.getDate(),
          dayYear = d.getFullYear(),
          dayString = `${dayOfTheWeek} ${monthName} ${dayOfMonth}, ${dayYear}`;
    return { "key": dayString };
  }

  getDays() {
    const date = new Date(),
          year = date.getFullYear(),
          month = date.getMonth();

    let data = [];
    for (let i = 1; i <= 365; i++) {
      const d = new Date(year, month, i);
      const dayObject = this.getDayObject(d);
      data.push(dayObject);
    }

    return data;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => <Text>{item.key}</Text>} />
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
