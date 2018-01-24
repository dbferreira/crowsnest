import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, } from 'react-native';
import { TextInput } from '@shoutem/ui';
import { inputChangedChild } from '../../store/actions';

class EditChild extends Component {
  static navigationOptions = {
    title: 'Register Child'
  }
  render() {
    return (
      <View>
        <TextInput
          placeholder={'Child name'}
          onChangeText={value => this.props.inputChangedChild({ type: 'name', value })}
        />
        <TextInput
          placeholder={'Age (years)'}
          onChangeText={value => this.props.inputChangedChild({ type: 'age', value })}
        />
        <TextInput
          placeholder={'Minutes per day'}
          onChangeText={value => this.props.inputChangedChild({ type: 'timePerDay', value })}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ parent }) => {
  const { child } = parent;

  return { child };
};

export default connect(mapStateToProps, { inputChangedChild })(EditChild);
