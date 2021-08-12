import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import {
  Container,
  Header,
  Content,
  Left,
  Icon,
  Body,
  Right,
  Button,
  List,
  ListItem,
  Item,
  Input,
  Thumbnail,
} from 'native-base';
import ImageBlurLoading from 'react-native-image-blur-loading';
import CommentComponet from '../components/CommentComponent';
const my = require('../assets/my.png');
import { addComment, getComment } from '../config/firebaseFunctions';

import * as firebase from 'firebase';
import 'firebase/firestore';
export default function DetailPage({ navigation, route }) {
  const [commentInput, setCommentInput] = useState('');
  const [comment, setComment] = useState([]);
  const content = route.params.content;

  useEffect(() => {
    navigation.setOptions({
      title: '디테일페이지',
      headerStyle: {
        backgroundColor: '#fff',
        shadowColor: '#fff',
      },
      headerTintColor: 'grey',
      headerShown: true,
      headerBackTitleVisible: false,
    });

    commentLoad(content.date);
  }, []);

  const commentLoad = async (did) => {
    console.log('댓글 가져오기');
    console.log(did);
    let c = await getComment(did + 'D');
    if (c == 0) {
    } else {
      setComment(c);
    }
  };

  const commentFunc = async () => {
    let date = new Date();
    let getTime = date.getTime();
    const currentUser = firebase.auth().currentUser;
    let newComment = {
      date: getTime,
      comment: commentInput,
      did: content.date + 'D',
      uid: currentUser.uid,
    };

    let result = await addComment(newComment);
    if (result) {
      Alert.alert('댓글이 정상적으로 저장되었습니다!');
      await setComment([...comment, newComment]);
    }
  };
  
  return (
    <Container>
      <Content
        contentContainerStyle={{
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <ImageBlurLoading
          withIndicator
          thumbnailSource={{ uri: content.image }}
          source={{ uri: content.image }}
          style={{ width: '90%', height: 200, borderRadius: 10 }}
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: '700',
            color: '#333',
            alignSelf: 'flex-start',
            marginLeft: 25,
            marginTop: 20,
          }}
        >
          {content.title}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '700',
            color: 'grey',
            alignSelf: 'flex-start',
            marginLeft: 25,
            marginTop: 20,
          }}
        >
          {content.desc}
        </Text>

        <Item style={{ marginTop: 100 }}>
          <Input
            placeholder="한마디 부탁해요~"
            value={commentInput}
            onChangeText={(text) => {
              setCommentInput(text);
            }}
          />
          <Icon
            active
            name="paper-plane"
            onPress={() => {
              commentFunc();
            }}
          />
        </Item>
        <List>
          {comment.map((c, i) => {
            return <CommentComponet key={i} comment={c} />;
          })}
        </List>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({});
