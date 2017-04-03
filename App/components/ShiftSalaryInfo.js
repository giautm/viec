import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import humanFormat from 'human-format';
import moment from 'moment';

const SalaryInfo = ({ data }) => (
  <View style={styles.container}>
    <View style={styles.dateContainer}>
      <Text style={styles.date}>
        {moment(data.date).format('DD MMM')}
      </Text>
    </View>
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text style={styles.salary}>
        {humanFormat(data.salary, {
          scale: 'SI',
        })}
      </Text>
      <Text style={styles.shiftHours}>
        {data.hours > 0 ? `${data.hours} giờ` : 'N/a'}
      </Text>
    </View>
    <Text style={styles.checkInOut}>
      {moment(data.start).format('HH:mm')} - {data.end
        ? moment(data.end).format('HH:mm')
        : 'N/a'}
    </Text>
  </View>
);

SalaryInfo.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]).isRequired,
    salary: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    start: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]).isRequired,
    end: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
  }).isRequired,
};

export default SalaryInfo;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  dateContainer: {
    borderBottomWidth: 1,
    borderColor: 'rgb(71,120,144)',
    paddingBottom: 5,
  },
  date: {
    color: 'rgb(33,126,161)',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  salary: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
  },
  shiftHours: {
    color: 'rgb(171,171,171)',
    fontSize: 18,
    textAlign: 'center',
  },
  checkInOut: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});
