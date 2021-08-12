import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function MinusButton({ Plus }) {
  return (
    <TouchableOpacity onPress={Plus} style={styles.container}>
      <Text> Plus </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'yellow',
    width: 50,
    height: 50,
  },
});
