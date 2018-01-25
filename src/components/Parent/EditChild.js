import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, } from 'react-native';
import { TextInput, Button } from '@shoutem/ui';
import { inputChangedChild } from '../../store/actions';

class EditChild extends Component {
  static navigationOptions = {
    title: 'Register Child'
  }

  onSaveButtonPress() {
    const { name, age, timePerDay } = this.props.child;
    console.log('saving child info', name, age, timePerDay);
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <TextInput
          autoFocus
          autoCorrect={false}
          style={styles.inputStyle}
          placeholder={'Child name'}
          onChangeText={value => this.props.inputChangedChild({ type: 'name', value })}
        />
        <TextInput
          keyboardType={'numeric'}
          style={styles.inputStyle}
          placeholder={'Age (years)'}
          onChangeText={value => this.props.inputChangedChild({ type: 'age', value })}
        />
        <TextInput
          keyboardType={'numeric'}
          style={styles.inputStyle}
          placeholder={'Minutes per day'}
          onChangeText={value => this.props.inputChangedChild({ type: 'timePerDay', value })}
        />
        <Button
          style={styles.buttonStyle}
          onPress={this.onSaveButtonPress.bind(this)}
        >
          <Text style={{ color: '#fff' }}>Add child</Text>
        </Button>
      </View>
    );
  }
}

const styles = {
  buttonStyle: {
    borderColor: '#595959',
    backgroundColor: '#2980b9',
    height: 40,
    margin: 10,
    elevation: 5,
    borderRadius: 5
  },

  inputStyle: {
    borderBottomColor: '#aaaaaa',
    borderBottomWidth: 1,
    marginTop: 10,
    elevation: 2,
  }

};

const mapStateToProps = ({ parent }) => {
  const { child } = parent;

  return { child };
};

export default connect(mapStateToProps, { inputChangedChild })(EditChild);
