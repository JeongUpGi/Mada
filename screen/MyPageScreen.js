import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';

const MyPageScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>My Page</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default MyPageScreen;
