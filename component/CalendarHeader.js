import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CalendarHeader = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        {`${props.date.getFullYear()}년 ${props.date.getMonth() + 1}월`}
      </Text>
      <TouchableOpacity style={styles.navButton} onPress={props.onNextMonth}>
        <MaterialCommunityIcons name="arrow-down" color={'#000'} size={15} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  navButton: {
    padding: 10,
  },
  navButtonIcon: {
    fontSize: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CalendarHeader;
