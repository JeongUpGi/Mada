import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';

const LibraryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Library</Text>
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

export default LibraryScreen;
