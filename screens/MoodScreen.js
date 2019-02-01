import React from 'react';
import { ScrollView, StyleSheet, Text, View, SectionList } from 'react-native';

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
                    "November", "December"],
          dayIdx = d.getDay(),
          dayOfTheWeek = days[dayIdx],
          monthIdx = d.getMonth(),
          monthName = months[monthIdx],
          dayOfMonth = d.getDate(),
          dayYear = d.getFullYear(),
          nameString = `${dayOfTheWeek} ${monthName} ${dayOfMonth}, ${dayYear}`;
    return { "month": monthName, "year": dayYear, dayOfTheWeek, dayOfMonth, nameString };
  }

  getDays() {
    const date = new Date(),
          year = date.getFullYear(),
          month = date.getMonth();

    let data = [];
    for (let i = 1; i <= 365; i++) {
      const d = new Date(year, month, i);
      const dayObject = this.getDayObject(d);
      const section = `${dayObject.month} ${dayObject.year}`;

      let sectionFound = false;
      data.forEach((obj, idx) => {
        if (obj.title === section) {
          sectionFound = true;
          data[idx]['data'][0]["days"].push(dayObject);
        }
      })
      if (!sectionFound) {
        const newSection = { "title": section, data: [{ "days" : [dayObject] }] }
        data.push(newSection);
      }
    }

    return data;
  }

  renderMonth(index, item) {
    const days = item.days;
    const saturdays = days.filter((d) => d.dayOfTheWeek === "Saturday");
    const sundays = days.filter((d) => d.dayOfTheWeek === "Sunday");
    return (
      <View key={index} style={styles.monthContainer}>
        <View style={styles.weekdayColumnContainer}>
          { sundays.map((s) => <Text key={s.dayOfMonth} styles={styles.sundays}>{s.dayOfMonth}</Text>) }
        </View>
        <View style={styles.weekdayColumnContainer}>
          { saturdays.map((s) => <Text key={s.dayOfMonth} styles={styles.saturdays}>{s.dayOfMonth}</Text>) }
        </View>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <SectionList
          renderItem={({item, index, section}) => this.renderMonth(index, item)}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          sections={this.state.data}
          keyExtractor={(item, index) => item + index}
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
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  monthContainer: {
    flexDirection: 'row',
  },
  weekdayColumnContainer: {
    flexDirection: 'column'
  },
  sundays: {
  },
  saturdays: {
  }
});
