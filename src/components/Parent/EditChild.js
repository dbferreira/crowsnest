import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Keyboard } from 'react-native';
import { TextInput, Button, Spinner } from '@shoutem/ui';
import { inputChangedChild, createChild } from '../../store/actions';

class EditChild extends Component {
  static navigationOptions = {
    title: 'Register Child'
  }

  onSaveButtonPress() {
    this.props.createChild(this.props.child);
    Keyboard.dismiss();
  }

  renderButtonSaving() {
    if (this.props.saving) {
      return <Spinner style={{ color: 'white' }} />;
    }
    return <Text style={{ color: '#fff' }}>Add child</Text>;
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
          disabled={!!this.props.saving}
          style={styles.buttonStyle}
          onPress={this.onSaveButtonPress.bind(this)}
        >
          {this.renderButtonSaving()}
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
  const { child, saving } = parent;

  return { child, saving };
};

export default connect(mapStateToProps, { inputChangedChild, createChild })(EditChild);
