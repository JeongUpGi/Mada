import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';

import Calendar from '../component/Calendar';

const CalendarScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Calendar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default CalendarScreen;
