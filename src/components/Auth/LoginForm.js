import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { NavigationBar, Divider, TextInput, Text, Button, View, Icon, Spinner, ImageBackground } from '@shoutem/ui';
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
          <Icon name="lock" style={{ color: '#fff' }} />
          <Text style={{ color: '#fff' }}>LOG IN</Text>
        </Button>
        <Text style={styles.errorStyle}>{this.props.error}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.screenStyle}>
        <ImageBackground
          resizeMode={'cover'}
          style={styles.imageBackgroundStyle}
          source={{ uri: 'https://previews.123rf.com/images/dazdraperma/dazdraperma1206/dazdraperma120600002/14029416-illustration-of-palm-trees-on-desert-island.jpg' }}
        >
          <View style={styles.loginSectionStyle}>
            <Text
              style={styles.headerStyle}
            >
            CROW'S NEST
            </Text>
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
        </ImageBackground>
      </View>
    );
  }
}

const win = Dimensions.get('window');

const styles = {
  screenStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  imageBackgroundStyle: {
    flexDirection: 'row',
    height: win.height,
    width: win.width
  },

  headerStyle: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 25,
    marginBottom: 30,
    elevation: 5
  },

  loginSectionStyle: {
    flex: 1,
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },

  inputStyle: {
    marginTop: 10,
    backgroundColor: '#ffffffee',
    borderColor: '#595959',
    borderWidth: 1,
    elevation: 5,
    alignSelf: 'stretch',
    borderRadius: 5,
  },

  buttonStyle: {
    borderColor: '#595959',
    backgroundColor: '#0f9f12',
    width: 150,
    elevation: 5,
    borderRadius: 5
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
