/* @flow */

import React from 'react';
import {
  Animated,
  Platform,
  View,
  Text,
  Image,
} from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';

import ShiftHistory from '../components/ShiftHistory';
import RatingStars from '../components/RatingStars';

const PHOTO_HEIGHT = 160;
const PHOTO_WIDTH = PHOTO_HEIGHT * (3 / 4);

const ICON_PREFIX = Platform.OS === 'ios'
  ? 'ios'
  : 'md';

const InfoRow = ({ icon, text }) => (
  <View style={{flexDirection: 'row', alignItems: 'center', height: 22}}>
    <View style={{width: 20, alignItems: 'center'}}>
      <Ionicons name={`${ICON_PREFIX}-${icon}`} size={20}/>
    </View>
    <Text style={{fontSize: 18, lineHeight: 20}}> {text}</Text>
  </View>
);

export default class ModalScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Thông tin nhân viên',
    },
  };

  render() {
    const stars = 3.6;
    return (
      <View style={{ flex: 1 }}>
        <View style={{flexDirection: 'row', padding: 10}}>
          <View style={{
            width: PHOTO_WIDTH,
            height: PHOTO_HEIGHT,
          }}>
            <Image
              style={{
                width: PHOTO_WIDTH,
                height: PHOTO_HEIGHT,
              }}
              source={{uri: 'https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-1/p320x320/17190952_1449709661726453_2504216330678137377_n.jpg?oh=d7480e43cc22325908a5fecab8943c3b&oe=599A1B6D'}}/>
            <RatingStars
              stars={stars}
              style={{
                paddingHorizontal: 5,
                backgroundColor: 'rgba(0,0,0,0.25)',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
              }}
            />
          </View>
          <View style={{flex: 1, paddingLeft: 10}}>
            <Text
              style={{fontSize: 22}}
              ellipsizeMode="middle"
            >Trần Minh Giàu</Text>
            <Text>Đang làm việc</Text>
            <View style={{
              marginTop: 10,
            }}>
              <InfoRow icon="card" text="025359730"/>
              <InfoRow icon="female" text="Nữ"/>
              <InfoRow icon="contact" text="0163 639 2248"/>
              <InfoRow icon="briefcase" text="Vận chuyển"/>
              <InfoRow icon="cash" text="100,000,000"/>
            </View>
          </View>
        </View>
        <Text
          style={{
            paddingBottom: 5,
            paddingHorizontal: 10,
            paddingTop: 20,
          }}
          >Lịch sử làm việc</Text>
        <ShiftHistory/>
      </View>
    );
  }
}
