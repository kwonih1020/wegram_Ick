import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Icon, Text, Card, CardItem } from 'native-base';
const image = require('../assets/background2.png');
const logo = require('../assets/logo.png');
import ImageBlurLoading from 'react-native-image-blur-loading';

import * as firebase from 'firebase';
import 'firebase/firestore';

import { doLike } from '../config/firebaseFunctions';
export default function CardComponent({ navigation, content }) {
  const [like, setLike] = useState(false);
  useEffect(() => {
    if (content.like == true) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, []);

  const likeFunc = () => {
    const currentUser = firebase.auth().currentUser;
    const uid = currentUser.uid;
    const did = content.date + 'D';
    let result = doLike(uid, did, like);
    if (result) {
      console.log('좋아요!');
      if (like == true) {
        //좋아요 -> 해제
        setLike(false);
      } else {
        //해제 -> 좋아요
        setLike(true);
      }
    }
  };
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DetailPage', { content: content });
      }}
      style={styles.container}
    >
      <Card style={styles.card} transparent>
        <CardItem transparent>
          <ImageBlurLoading
            withIndicator
            thumbnailSource={{ uri: content.image }}
            source={{ uri: content.image }}
            style={styles.image}
          />
        </CardItem>
        <CardItem style={{ marginTop: -10 }}>
          <Grid>
            <Col size={9}>
              <Text numberOfLines={1} style={styles.title}>
                {content.title}
              </Text>
              <Text style={[styles.grey, styles.writer]}>{content.author}</Text>
            </Col>
            <Col size={2}>
              <Grid>
                <Col>
                  <Icon name="chatbox-outline" style={styles.grey} />
                </Col>
                <Col>
                  <Icon
                    name={like == true ? 'heart' : 'heart-outline'}
                    style={like == true ? styles.pink : styles.grey}
                    onPress={() => {
                      likeFunc();
                    }}
                  />
                </Col>
              </Grid>
            </Col>
          </Grid>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', alignSelf: 'center' },
  card: {
    width: '100%',
    alignSelf: 'center',
  },
  image: { height: 200, width: '100%', borderRadius: 10 },
  grey: { color: 'grey' },
  pink: { color: 'deeppink' },
  writer: { fontSize: 12, color: 'grey', marginLeft: 10 },
  title: { fontWeight: '700', fontSize: 15, marginLeft: 10 },
});
