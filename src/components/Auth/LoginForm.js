import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, BackHandler, Keyboard, TextInput, Text, TouchableOpacity, View, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
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
      return <ActivityIndicator size="small" color="#ECF0F1" />
    }
    return (
      <View>
        <TouchableOpacity
          onPress={this.onButtonPress.bind(this)}        >
          <Text style={styles.buttonStyle}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.errorStyle}>{this.props.error}</Text>
      </View>
    );
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.screenStyle} behavior="padding" enabled>

        <BackgroundImage
          resizeMode={'cover'}
          style={{ ...styles.imageBackgroundStyle, height: this.state.dimensions.height, width: this.state.dimensions.width }}
          source={require('./loginBackground.jpg')} // eslint-disable-line global-require
        >
          <View style={styles.loginSectionStyle}>
            <TextInput
              autoCorrect={false}
              returnKeyType={'next'}
              keyboardType={'email-address'}
              style={styles.inputStyle}
              placeholder={'Username'}
              placeholderTextColor={'#ECF0F1'}
              onChangeText={value => this.props.inputChangedLogin({ type: 'email', value })}
              enablesReturnKeyAutomatically
            />
            <TextInput
              autoCorrect={false}
              style={styles.inputStyle}
              placeholder={'Password'}
              placeholderTextColor={'#ECF0F1'}
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
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  screenStyle: {

  },

  imageBackgroundStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },

  loginSectionStyle: {
    flexGrow: 0,
    flexShrink: 0,
    marginBottom: 50,
    marginLeft: 30,
    marginRight: 30
  },

  inputStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.58)',
    borderColor: 'transparent',
    alignSelf: 'stretch',
    borderRadius: 100,
    height: 50,
    padding: 0,
    margin: 0,
    marginTop: 10,
    borderWidth: 0,
    color: '#ECF0F1',
    fontSize: 16,
    fontWeight: '300',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    paddingLeft: 20
  },

  buttonStyle: {
    alignSelf: 'center',
    lineHeight: 50,
    fontSize: 16,
    color: "#ECF0F1"
  },

  buttonHolderStyle: {
    marginTop: 30,
    backgroundColor: '#2980b9',
    borderRadius: 100,
    height: 50,
  },

  errorStyle: {
    color: '#ECF0F1',
    marginTop: 10
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, { inputChangedLogin, loginUser })(LoginForm);
