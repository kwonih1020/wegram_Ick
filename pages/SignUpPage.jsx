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
      setNickNameError('Please enter your Nickname');
      return false;
    } else {
      setNickNameError('');
    }

    if (email == '') {
      setEmailError('Please enter your Email');
      return false;
    } else {
      setEmailError('');
    }

    if (password == '') {
      setPasswordError('Please enter your password');
      return false;
    } else {
      setPasswordError('');
    }

    if (passwordConfirm == '') {
      setPasswordConfirmError('Please confirm your password');
      return false;
    } else {
      setPasswordConfirmError('');
    }

    if (password !== passwordConfirm) {
      setPasswordConfirmError('Passwords donot match');
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
              title={'Nickname'}
              type={'nickName'}
              error={nickNameError}
              setFunc={setNickName}
            />
            <ItemInput
              title={'Email'}
              type={'email'}
              error={emailError}
              setFunc={setEmail}
            />
            <ItemInput
              title={'Password'}
              type={'password'}
              error={passwordError}
              setFunc={setPassword}
            />
            <ItemInput
              title={'Confirm Password'}
              type={'password'}
              error={passwordConfirmError}
              setFunc={setPasswordConfirm}
            />
          </Form>
          <Button full style={styles.emailSignUp} onPress={doSignUp}>
            <Text>Sign Up</Text>
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
