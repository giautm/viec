import React from 'react';
import {
  ListView,
  Text,
  View,
} from 'react-native';
import ShiftSalaryInfo from './ShiftSalaryInfo';

export default class ShiftHistory extends React.Component {
  constructor(props, context) {
    super(props, context);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRows([
        {
          date: '2017-03-01',
          start: '2017-03-01T12:10:00',
          end: '2017-03-01T22:10:00',
          hours: 5,
          salary: 100000,
        },
        {
          date: '2017-03-02',
          start: '2017-03-02T12:10:00',
          end: '2017-03-02T22:10:00',
          hours: 5,
          salary: 100000,
        },
        {
          date: '2017-03-03',
          start: '2017-03-03T12:10:00',
          end: '2017-03-03T22:10:00',
          hours: 5,
          salary: 100000,
        },
        {
          date: '2017-03-04',
          start: '2017-03-04T12:10:00',
          end: '2017-03-04T22:10:00',
          hours: 5,
          salary: 100000,
        },
        {
          date: '2017-03-04',
          start: '2017-03-04T12:10:00',
          end: '2017-03-04T22:10:00',
          hours: 5,
          salary: 100000,
        },
        {
          date: '2017-03-04',
          start: '2017-03-04T12:10:00',
          end: '2017-03-04T22:10:00',
          hours: 5,
          salary: 100000,
        },
        {
          date: '2017-03-04',
          start: '2017-03-04T12:10:00',
          end: '2017-03-04T22:10:00',
          hours: 5,
          salary: 100000,
        },
        {
          date: '2017-03-04',
          start: '2017-03-04T12:10:00',
          end: '2017-03-04T22:10:00',
          hours: 5,
          salary: 100000,
        },
        {
          date: '2017-03-04',
          start: '2017-03-04T12:10:00',
          end: '2017-03-04T22:10:00',
          hours: 5,
          salary: 100000,
        },
        {
          date: '2017-03-04',
          start: '2017-03-04T12:10:00',
          end: '2017-03-04T22:10:00',
          hours: 5,
          salary: 100000,
        },
        {
          date: '2017-03-04',
          start: '2017-03-04T12:10:00',
          end: '2017-03-04T22:10:00',
          hours: 5,
          salary: 100000,
        },
        {
          date: '2017-03-04',
          start: '2017-03-04T12:10:00',
          end: '2017-03-04T22:10:00',
          hours: 5,
          salary: 100000,
        },
        {
          date: '2017-03-04',
          start: '2017-03-04T12:10:00',
          end: '2017-03-04T22:10:00',
          hours: 5,
          salary: 100000,
        },
        {
          date: '2017-03-04',
          start: '2017-03-04T12:10:00',
          end: '2017-03-04T22:10:00',
          hours: 240,
          salary: 100000000,
        },
        {
          date: '2017-03-04',
          start: '2017-03-04T12:10:00',
          end: '2017-03-04T22:10:00',
          hours: 5,
          salary: 100000,
        },
        {
          date: '2017-03-04',
          start: '2017-03-04T12:10:00',
          end: '2017-03-04T22:10:00',
          hours: 5,
          salary: 100000,
        },
      ]),
    };
  }

  componentDidMount() {
    this.listView.scrollToEnd({
      animated: false,
    });
  }

  renderRow(row) {
    return (
      <ShiftSalaryInfo data={row}/>
    );
  }

  render () {
    return (
      <View style={{height : 130, backgroundColor: 'rgb(29,29,29)'}}>
        <ListView
          ref={(ref) => {
            this.listView = ref;
          }}
          dataSource={this.state.dataSource}
          horizontal
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}
