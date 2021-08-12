import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Text, Thumbnail } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
const LoadingImage = require('../assets/loading.gif');
export default function Loading() {
  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        <Thumbnail large source={LoadingImage}></Thumbnail>
        <Text style={styles.title}>wegram</Text>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3DAE2',
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
});
