import React from 'react';
import { Dimensions } from 'react-native';
import ImageBlurLoading from 'react-native-image-blur-loading';
const imageWidth = Dimensions.get('window').width / 3;
//기기마다 다른 길이를 3등분 시킨 함수 Dimensions를 사용함
export default function ImageComponent({ image }) {
  return (
    <ImageBlurLoading
      withIndicator
      thumbnailSource={{ uri: image }}
      source={{ uri: image }}
      style={{ width: imageWidth, height: imageWidth }}
    />
  );
}
