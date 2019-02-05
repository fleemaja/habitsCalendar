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
          completed = Math.random() > 0.5 ? true : false,
          nameString = `${dayOfTheWeek} ${monthName} ${dayOfMonth}, ${dayYear}`;
    return { "month": monthName, "year": dayYear, dayOfTheWeek, dayOfMonth, nameString, completed };
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

  getColumnInfo(days, dayName) {
    let firstRow = [];
    let finishedLoop = false;
    days.forEach((d) => {
      let currentDay = d.dayOfTheWeek;
      if (currentDay !== 'Sunday' && !finishedLoop) {
        firstRow.push(d.dayOfMonth)
      } else if (currentDay === 'Sunday') {
        finishedLoop = true;
      }
    })
    let dnDays = days.filter((d) => d.dayOfTheWeek === dayName);
    let onFirstRow = false;
    if (firstRow.length > 0) {
      firstRow.forEach((day) => {
        if (dnDays[0].dayOfMonth === day) {
          onFirstRow = true;
        }
      })
    } else {
      onFirstRow = true;
    }
    if (!onFirstRow) {
      const blankDay = { 'dayOfMonth': null }
      dnDays = [blankDay, ...dnDays];
    }
    return dnDays;
  }

  _renderDay(d) {
    if (d.dayOfMonth == null) {
      return (
        <View style={styles.day} key={Math.floor(99999999999999 * Math.random())}>
          <Text style={styles.nullText}></Text>
        </View>
      )
    } else {
      const dayStyles = d.completed ? [styles.day, styles.completed] : [styles.day];
      return (
        <View key={d.dayOfMonth} style={dayStyles}>
          <Text style={styles.dayText}>{d.dayOfMonth}</Text>
        </View>
      )
    }
  }

  renderMonth(index, item) {
    const days = item.days;
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                  'Thursday', 'Friday', 'Saturday'];
    return (
      <View key={index} style={styles.monthContainer}>
        {
          dayNames.map((dayName) => {
            const dnDays = this.getColumnInfo(days, dayName);
            return (
              <View style={styles.weekdayColumnContainer} key={dayName}>
                {
                  dnDays.map((d) => this._renderDay(d))
                }
              </View>
            )
          })
        }
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
    margin: 20,
    backgroundColor: '#fff',
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  monthContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  weekdayColumnContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  day: {
    height: 64,
    justifyContent: 'center'
  },
  completed: {
    backgroundColor: '#b0c4de',
    borderRadius: 50,
  },
  dayText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#333'
  }
});
