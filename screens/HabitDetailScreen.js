import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class HabitDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.item.key,
    }
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Text style={styles.habitLabel}>{ params.item.key }</Text>
        <Text style={styles.description}>{ params.item.description}</Text>
        <Text style={styles.days}>
          {
            (params.item.days.filter((d) => d.toggled).length === 7)
              ? "Daily"
              : params.item.days.filter((d) => d.toggled)
                     .map((d) => d.name)
                     .join(", ")
          }
        </Text>
        <View style={styles.month}>
          <View style={styles.week}>
            <View style={styles.day}><Text>1</Text></View>
            <View style={[styles.day, styles.completedDay]}><Text>2</Text></View>
            <View style={styles.day}><Text>3</Text></View>
            <View style={[styles.day, styles.completedDay]}><Text>4</Text></View>
          </View>
          <View style={styles.week}>
            <View style={styles.day}><Text>5</Text></View>
            <View style={styles.day}><Text>6</Text></View>
            <View style={styles.day}><Text>7</Text></View>
            <View style={[styles.day, styles.completedDay]}><Text>8</Text></View>
            <View style={styles.day}><Text>9</Text></View>
            <View style={[styles.day, styles.completedDay]}><Text>10</Text></View>
            <View style={styles.day}><Text>11</Text></View>
          </View>
          <View style={styles.week}>
            <View style={[styles.day, styles.completedDay]}><Text>12</Text></View>
            <View style={[styles.day, styles.completedDay]}><Text>13</Text></View>
            <View style={[styles.day, styles.completedDay]}><Text>14</Text></View>
            <View style={styles.day}><Text>15</Text></View>
            <View style={[styles.day, styles.completedDay]}><Text>16</Text></View>
            <View style={styles.day}><Text>17</Text></View>
            <View style={[styles.day, styles.completedDay]}><Text>18</Text></View>
          </View>
          <View style={styles.week}>
            <View style={styles.day}><Text>19</Text></View>
            <View style={styles.day}><Text>20</Text></View>
            <View style={[styles.day, styles.completedDay]}><Text>21</Text></View>
            <View style={[styles.day, styles.completedDay]}><Text>22</Text></View>
            <View style={styles.day}><Text>23</Text></View>
            <View style={styles.day}><Text>24</Text></View>
            <View style={[styles.day, styles.completedDay]}><Text>25</Text></View>
          </View>
          <View style={styles.week}>
            <View style={[styles.day, styles.completedDay]}><Text>26</Text></View>
            <View style={[styles.day, styles.completedDay]}><Text>27</Text></View>
            <View style={styles.day}><Text>28</Text></View>
            <View style={styles.day}><Text>29</Text></View>
            <View style={[styles.day, styles.completedDay]}><Text>30</Text></View>
            <View style={styles.day}><Text>31</Text></View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  habitLabel: {
    fontSize: 48,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 24
  },
  month: {
    flexDirection: 'column',
    marginTop: 40
  },
  week: {
    flexDirection: 'row'
  },
  day: {
    borderRadius: 25,
    flex: 1,
    padding: 15
  },
  completedDay: {
    backgroundColor: 'powderblue',
  },
  days: {
    color: 'blue'
  }
});
