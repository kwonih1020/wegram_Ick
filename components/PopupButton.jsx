import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function PopupButton({ CustomAlert, title }) {
  return (
    <View>
      <TouchableOpacity onPress={CustomAlert}>
        <Text> {title}팝업 버튼 </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
