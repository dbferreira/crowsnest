import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, BackHandler, Keyboard, TextInput, Text, Button, View, ActivityIndicator } from 'react-native';
// import { TextInput, Text, Button, View, Icon, Spinner, ImageBackground } from '@shoutem/ui';
import { inputChangedLogin, loginUser } from '../../store/actions';
import { BackgroundImage } from '../Common';

class LoginForm extends Component {
  state = {};

  static navigationOptions = {
    headerMode: 'none',
    header: null
  }

  componentWillMount() {
    this.setState({ dimensions: Dimensions.get('window') });
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress() {
    BackHandler.exitApp();
    return true;
  }

  onButtonPress() {
    const { navigate } = this.props.navigation;
    const { email, password } = this.props;
    this.props.loginUser({ email, password, navigate });
    Keyboard.dismiss();
  }

  renderButton() {
    if (this.props.loading) {
      return <ActivityIndicator size="small" color="#2980B9" />
    }
    return (
      <View>
        <Button
          title="Login"
          style={styles.buttonStyle}
          onPress={this.onButtonPress.bind(this)}
        >
          {/* <Icon name="lock" style={{ color: '#fff' }} /> */}
          <Text style={{ color: '#fff' }}>lock-icon</Text>
          <Text style={{ color: '#fff' }}>LOG IN</Text>
        </Button>
        <Text style={styles.errorStyle}>{this.props.error}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.screenStyle}>
        <BackgroundImage
          resizeMode={'cover'}
          style={{ ...styles.imageBackgroundStyle, height: this.state.dimensions.height, width: this.state.dimensions.width }}
          source={require('./loginBackground.png')} // eslint-disable-line global-require
        >
          <View style={styles.loginSectionStyle}>
            <Text
              style={styles.headerStyle}
            >
              CROW&apos;S NEST
            </Text>
            <TextInput
              autoCorrect={false}
              returnKeyType={'next'}
              keyboardType={'email-address'}
              style={styles.inputStyle}
              placeholder={'user@gmail.com'}
              onChangeText={value => this.props.inputChangedLogin({ type: 'email', value })}
              enablesReturnKeyAutomatically
            />
            <TextInput
              autoCorrect={false}
              style={styles.inputStyle}
              placeholder={'passw0rd'}
              onChangeText={value => this.props.inputChangedLogin({ type: 'password', value })}
              secureTextEntry
              returnKeyType={'done'}
              enablesReturnKeyAutomatically
            />
            <View style={styles.buttonHolderStyle}>
              {this.renderButton()}
            </View>
          </View>
        </BackgroundImage>
      </View>
    );
  }
}

const styles = {
  screenStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  imageBackgroundStyle: {
    flexDirection: 'row'
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
    borderWidth: 0,
    backgroundColor: '#2980b9',
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

export default connect(mapStateToProps, { inputChangedLogin, loginUser })(LoginForm);
