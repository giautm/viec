import React from 'react';
import {
  Platform,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ICON_PREFIX = Platform.OS === 'ios'
  ? 'ios'
  : 'md';

const RatingStars = ({ stars, style, styleText }) => (
  <View style={[styles.container, style]}>
    <Text style={[styles.text, styleText]}>
      {parseFloat(Math.round(stars * 10) / 10).toFixed(1)}
    </Text>
    {[1, 2, 3, 4, 5].map((value) => (
      <Ionicons
        key={`star-${value}`}
        name={stars >= value
          ? `${ICON_PREFIX}-star`
          : ((value - stars) <= 0.5
            ? `${ICON_PREFIX}-star-half`
            : `${ICON_PREFIX}-star-outline`)}
        size={18}
        color={(stars >= value || value - stars <= 0.5)
          ? 'yellow'
          : 'rgba(255,255,255,1)'}/>
    ))}
  </View>
);

RatingStars.propTypes = {
  stars: React.PropTypes.number.isRequired,
};

export default RatingStars;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#fff',
    paddingHorizontal: 2,
  },
});
