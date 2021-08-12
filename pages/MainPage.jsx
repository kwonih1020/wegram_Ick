import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  View,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  Container,
  Header,
  Content,
  Left,
  Icon,
  Right,
  Text,
  Button,
} from 'native-base';
import CardComponent from '../components/CardComponent';
import HeaderComponent from '../components/HeaderComponent';
import * as Animatable from 'react-native-animatable';
import { getData, getNextData } from '../config/firebaseFunctions';
const data = require('../data.json');
export default function MainPage({ navigation }) {
  const [data, setData] = useState([]);
  const [next, setNext] = useState(0);

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
    getData(setNext, setData);
  }, []);

  console.log('다음:' + next);
  return (
    <Container>
      <HeaderComponent />
      {data.length == 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          ListHeaderComponent={() => {
            return (
              <Content style={{ marginTop: 30 }}>
                <Animatable.View
                  animation="pulse"
                  easing="ease-out"
                  iterationCount={3}
                  direction="alternate"
                >
                  <Grid style={styles.banner}>
                    <Col size={1} style={{ padding: 20 }}>
                      <Icon name="paper-plane" style={{ color: 'deeppink' }} />
                    </Col>
                    <Col size={6} style={{ padding: 15 }}>
                      <Text>이야기 하고 싶은 친구들에게</Text>
                      <Text style={{ fontWeight: '700' }}>
                        wegram을 전하세요
                      </Text>
                    </Col>
                  </Grid>
                </Animatable.View>

                <Grid style={{ padding: 20 }}>
                  <Text style={{ color: 'grey' }}>FROM THE DIARY</Text>
                </Grid>
              </Content>
            );
          }}
          onEndReachedThreshold={0}
          onEndReached={async () => {
            console.log('바닥 가까이 감: 리프레시');
            let nextData = await getNextData(next, setNext);
            if (nextData == 0) {
              Alert.alert('더이상 글이 없어요!');
            } else {
              let newData = [...data, ...nextData];
              console.log(newData);
              await setData(newData);
            }
          }}
          renderItem={(data) => {
            // console.log(data);
            return (
              <CardComponent navigation={navigation} content={data.item} />
            );
          }}
          numColumns={1}
          keyExtractor={(item) => item.date.toString()}
        />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#F6F6F6',
    height: 70,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
});
