import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavigationBar, Divider, TextInput, Text, Button, View, Icon, Spinner } from '@shoutem/ui';
import { inputChanged, loginUser } from '../../store/actions';

class LoginForm extends Component {
  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return (
      <View>
        <Button
          style={styles.buttonStyle}
          onPress={this.onButtonPress.bind(this)}
        >
          <Icon name="lock" />
          <Text>LOG IN</Text>
        </Button>
        <Text style={styles.errorStyle}>{this.props.error}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.screenStyle}>
        <NavigationBar
          title="CROW'S NEST"
          styleName="inline"
        />
        <Divider styleName="line" />
        <TextInput
          style={styles.inputStyle}
          placeholder={'user@gmail.com'}
          onChangeText={value => this.props.inputChanged({ type: 'email', value })}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder={'passw0rd'}
          onChangeText={value => this.props.inputChanged({ type: 'password', value })}
          secureTextEntry
        />
        <View style={styles.buttonHolderStyle}>
          {this.renderButton()}
        </View>
      </View>
    );
  }
}

const styles = {
  screenStyle: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  inputStyle: {
    alignSelf: 'stretch',
  },

  buttonStyle: {
    borderColor: '#4f4f4f',
    width: 150
  },

  buttonHolderStyle: {
    marginTop: 20
  },

  errorStyle: {
    color: 'red',
    marginTop: 10
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  inputChanged: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { inputChanged, loginUser })(LoginForm);
