import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const CalendarHeader = props => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.navButton} onPress={props.onPrevMonth}>
        <Text style={styles.navButtonIcon}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>
        {props.date.toLocaleString('en-US', {month: 'long', year: 'numeric'})}
      </Text>
      <TouchableOpacity style={styles.navButton} onPress={props.onNextMonth}>
        <Text style={styles.navButtonIcon}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  navButton: {
    padding: 10,
  },
  navButtonIcon: {
    fontSize: 25,
    color: 'skyblue',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CalendarHeader;
