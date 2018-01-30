import React, { PureComponent } from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default class BasicListItem extends PureComponent {
  handlePress() {
    this.props.onPress(this.props.item);
  }

  render() {
    const { item, labelKey } = this.props;
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}
        style={styles.itemStyle}
        key={item[labelKey]}
      >
        <Text style={styles.nameStyle}>{item[labelKey]}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  itemStyle: {
    borderBottomWidth: 1,
    padding: 5,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  },

  nameStyle: {
    fontSize: 16
  }
};
