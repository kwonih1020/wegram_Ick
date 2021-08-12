import React, { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Label,
  Button,
  Header,
  Left,
  Icon,
  Body,
  Right,
} from 'native-base';
const bImage = require('../assets/background.png');
import ItemInput from '../components/ItemInput';
import { registration } from '../config/firebaseFunctions';

export default function SignUpPage({ navigation }) {
  const [nickName, setNickName] = useState('');
  const [nickNameError, setNickNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  const doSignUp = () => {
    if (nickName == '') {
      setNickNameError('닉네임을 입력해주세요');
      return false;
    } else {
      setNickNameError('');
    }

    if (email == '') {
      setEmailError('이메일을 입력해주세요');
      return false;
    } else {
      setEmailError('');
    }

    if (password == '') {
      setPasswordError('비밀번호를 입력해주세요');
      return false;
    } else {
      setPasswordError('');
    }

    if (passwordConfirm == '') {
      setPasswordConfirmError('비밀번호 확인을 입력해주세요');
      return false;
    } else {
      setPasswordConfirmError('');
    }

    if (password !== passwordConfirm) {
      setPasswordConfirmError('비밀번호가 서로 일치 하지 않습니다.');
      return false;
    } else {
      setPasswordConfirmError('');
    }

    registration(nickName, email, password);
  };

  return (
    <Container style={styles.container}>
      <ImageBackground source={bImage} style={styles.backgroundImage}>
        <Header transparent>
          <Left>
            <Button
              transparent
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name="arrow-back" style={{ color: '#fff' }} />
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>
        <Content contentContainerStyle={styles.content} scrollEnabled={false}>
          <Text style={styles.title}>
            <Text style={styles.highlite}>we</Text>gram signup
          </Text>
          <Form style={styles.form}>
            <ItemInput
              title={'닉네임'}
              type={'nickName'}
              error={nickNameError}
              setFunc={setNickName}
            />
            <ItemInput
              title={'이메일'}
              type={'email'}
              error={emailError}
              setFunc={setEmail}
            />
            <ItemInput
              title={'비밀번호'}
              type={'password'}
              error={passwordError}
              setFunc={setPassword}
            />
            <ItemInput
              title={'비밀번호 확인'}
              type={'password'}
              error={passwordConfirmError}
              setFunc={setPasswordConfirm}
            />
          </Form>
          <Button full style={styles.emailSignUp} onPress={doSignUp}>
            <Text>등록</Text>
          </Button>
        </Content>
      </ImageBackground>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {},
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    margin: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  highlite: {
    fontSize: 25,
    fontWeight: '700',
    color: 'deeppink',
    textAlign: 'center',
  },
  form: {
    width: 250,
    borderRadius: 10,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 10,
  },

  snsSignUp: {
    alignSelf: 'center',
    width: 250,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#4667A5',
  },
  emailSignUp: {
    alignSelf: 'center',
    width: 250,
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: '#333',
  },
});
