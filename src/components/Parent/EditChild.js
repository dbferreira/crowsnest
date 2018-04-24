import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Keyboard, TextInput, Button, Spinner } from 'react-native';
// import { TextInput, Button, Spinner } from '@shoutem/ui';
import { inputChangedChild, createChild, deleteChild } from '../../store/actions';

class EditChild extends Component {
  state = {
    isCreate: true
  };
  static navigationOptions = {
    title: 'Child'
  }

  componentWillMount() {
    if (this.props.child.name) {
      this.setState({ isCreate: false });
    }
  }

  onSaveButtonPress() {
    const { navigate } = this.props.navigation;
    this.props.createChild(this.props.child, navigate, this.state.isCreate);
    Keyboard.dismiss();
  }

  onDeleteButtonPress() {
    // TODO: Prompt before delete
    const { navigate } = this.props.navigation;
    this.props.deleteChild(this.props.child, navigate);
    Keyboard.dismiss();
  }

  renderButtonText(savingText) {
    if (this.props.saving) {
      return <Spinner style={{ color: 'white' }} />;
    }
    return <Text style={{ color: '#fff' }}>{savingText}</Text>;
  }

  renderSaveButton(saveButtonText) {
    return (
      <Button
        title="saveButtonText"
        disabled={!!this.props.saving}
        style={styles.buttonStyle}
        onPress={this.onSaveButtonPress.bind(this)}
      >
        {this.renderButtonText(saveButtonText)}
      </Button>
    );
  }

  renderButtons() {
    if (this.state.isCreate) {
      return this.renderSaveButton('Add Child');
    }
    return (
      <View>
        {this.renderSaveButton('Update')}
        <Button
          title="Delete"
          disabled={!!this.props.saving}
          style={{ ...styles.buttonStyle, ...styles.deleteButtonStyle }}
          onPress={this.onDeleteButtonPress.bind(this)}
        >
          {this.renderButtonText('Delete')}
        </Button>
      </View >
    );
  }

  render() {
    const { name, age, timePerDay } = this.props.child;
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Text style={styles.labelStyle}>
          Child name
        </Text>
        <TextInput
          autoFocus={this.state.isCreate}
          autoCorrect={false}
          style={styles.inputStyle}
          placeholder={'Charlie'}
          onChangeText={value => this.props.inputChangedChild({ type: 'name', value })}
          value={name}
        />
        <Text style={styles.labelStyle}>
          Age (years)
        </Text>
        <TextInput
          keyboardType={'numeric'}
          style={styles.inputStyle}
          placeholder={'8'}
          onChangeText={value => this.props.inputChangedChild({ type: 'age', value })}
          value={age}
        />
        <Text style={styles.labelStyle}>
          Minutes per day
        </Text>
        <TextInput
          keyboardType={'numeric'}
          style={styles.inputStyle}
          placeholder={'60'}
          onChangeText={value => this.props.inputChangedChild({ type: 'timePerDay', value })}
          value={timePerDay}
        />
        {this.renderButtons()}
      </View>
    );
  }
}

const styles = {
  buttonStyle: {
    borderColor: '#2980b9',
    backgroundColor: '#2980b9',
    height: 40,
    margin: 10,
    marginTop: 20,
    elevation: 5,
    borderRadius: 5
  },

  inputStyle: {
    borderBottomColor: '#aaaaaa',
    borderBottomWidth: 1,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 0,
    paddingLeft: 10,
    height: 40,
    elevation: 1,
    borderRadius: 5
  },

  labelStyle: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 14
  },

  deleteButtonStyle: {
    backgroundColor: '#EA2027',
    borderColor: '#EA2027',
    marginTop: 5
  }

};

const mapStateToProps = ({ parent }) => {
  const { child, saving } = parent;

  return { child, saving };
};

export default connect(mapStateToProps, { inputChangedChild, createChild, deleteChild })(EditChild);
