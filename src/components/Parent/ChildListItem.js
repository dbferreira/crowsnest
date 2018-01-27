import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { setActiveChild } from '../../store/actions';

class ChildListItem extends Component {
  onPress() {
    const { navigate } = this.props.navigation;
    this.props.setActiveChild(this.props.child, navigate);
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

export default connect(null, { setActiveChild })(ChildListItem);
