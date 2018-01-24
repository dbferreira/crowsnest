import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

class ChildListItem extends Component {
  onPress() {
    console.log('pressed on ', this.props.child.name);
  }

  render() {
    const { name } = this.props.child;
    return (
      <TouchableOpacity
        onPress={this.onPress.bind(this)}
        style={styles.itemStyle}
        key={name}
      >
        <Text style={styles.nameStyle}>{name}</Text>
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

export default ChildListItem;
