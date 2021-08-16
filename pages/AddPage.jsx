import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Dimensions, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
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
  Thumbnail,
  Item,
  Input,
  Form,
  Textarea,
} from 'native-base';
import HeaderComponent from '../components/HeaderComponent';

const background2 = require('../assets/background2.png');
const loading = require('../assets/loading.gif');

import * as firebase from 'firebase';
import 'firebase/firestore';

import { addDiary, imageUpload } from '../config/firebaseFunctions';

const tempImage =
  'https://firebasestorage.googleapis.com/v0/b/sparta-study-plus.appspot.com/o/lecture%2F6-min.png?alt=media&token=bbc87679-4084-40ad-b6cd-01e808983fa4';

export default function AddPage() {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState('');

  const [image, setImage] = useState(tempImage);
  const [imageUri, setImageUri] = useState('');

  const [progress, setProgress] = useState(false);

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Need permissions to access to photos.');
      }
    }
  };

  const upload = async () => {
    console.log('업로드 준비중!');
    setProgress(true);
    const currentUser = firebase.auth().currentUser;
    let date = new Date();
    let getTime = date.getTime();
    let data = {
      title: title,
      author: currentUser.email,
      desc: content,
      image: image,
      date: getTime,
      uid: currentUser.uid,
    };
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const imageUrl = await imageUpload(blob, getTime);
    data.image = imageUrl;
    let result = await addDiary(data);
    if (result) {
      Alert.alert('Successfully added your post');
      setTitle('');
      setContent('');
      setImage(tempImage);
      setImageUri('');
      setProgress(false);
    } else {
      Alert.alert('oops! Please try again!');
      setProgress(false);
    }
  };

  const pickImage = async () => {
    console.log('이미지 선택');
    let imageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0,
    });

    getImageUrl(imageData);
  };

  const getImageUrl = async (imageData) => {
    setImageUri(imageData.uri);
  };

  return (
    <Container>
      {progress == false ? null : (
        <Image source={loading} style={styles.progress} />
      )}
      <HeaderComponent />
      <Content>
        <Image
          source={background2}
          style={{ width: '95%', height: 100, borderRadius: 10 }}
        />

        {imageUri == '' ? (
          <Grid style={styles.imageUpload} onPress={() => pickImage()}>
            <Text style={styles.imageUploadPlus}>+</Text>
          </Grid>
        ) : (
          <Image
            source={{ uri: imageUri }}
            style={styles.imagePreview}
            onPress={() => pickImage()}
          />
        )}

        <Item regular style={styles.title}>
          <Input
            placeholder="Title of your story"
            style={{ fontSize: 13 }}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </Item>
        <Form style={styles.contentLayout}>
          <Textarea
            rowSpan={5}
            bordered
            placeholder="Your Story"
            style={styles.content}
            value={content}
            onChangeText={(text) => setContent(text)}
          />
        </Form>
        <Button full style={styles.uploadButton} onPress={() => upload()}>
          <Text>Upload</Text>
        </Button>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  imageUpload: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey',
    borderStyle: 'dashed',
    width: '90%',
    height: 200,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    borderRadius: 10,
    width: '90%',
    height: 200,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  imageUploadPlus: {
    textAlign: 'center',
    width: '100%',
    fontSize: 90,
    fontWeight: '300',
    color: 'grey',
  },
  title: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  contentLayout: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  content: { borderRadius: 10, fontSize: 13 },
  uploadButton: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: 'pink',
  },
  progress: {
    width: 100,
    height: 100,
    borderRadius: 100,
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    zIndex: 2,
  },
});
