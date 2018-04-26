import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, BackHandler, Keyboard, TextInput, Text, TouchableOpacity, View, ActivityIndicator, KeyboardAvoidingView, Platform, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { inputChangedLogin, loginUser } from '../../store/actions';
import { BackgroundImage } from '../Common';
import { primaryColor, secondaryColor, greyColor } from '../../styles/variables';

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
      return <ActivityIndicator size="small" color={greyColor} />
    }
    return (
      <View>
        <TouchableOpacity
          onPress={this.onButtonPress.bind(this)}>
          <LinearGradient colors={[primaryColor, secondaryColor]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.linearGradient}>
            <Text style={styles.button}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.error}>{this.props.error}</Text>
      </View>
    );
  }

  render() {
    const { imageBackground, logo, logoImage, loginSection, textInputCombined, textFieldIcon, input, buttonHolder } = styles;
    return (
      <KeyboardAwareScrollView>
        <BackgroundImage
          resizeMode={'cover'}
          style={{ ...imageBackground, height: this.state.dimensions.height, width: this.state.dimensions.width }}
          source={require('./loginBackground.jpg')} // eslint-disable-line global-require
        >
          <View style={logo}>
            <Image
              style={logoImage}
              source={require('./Logo.png')}
            />
          </View>
          <View style={loginSection}>
            <View style={textInputCombined}>
              <Icon style={textFieldIcon} name="user" size={18} color={greyColor} />
              <TextInput
                autoCorrect={false}
                returnKeyType={'next'}
                keyboardType={'email-address'}
                style={input}
                placeholder={'Username'}
                placeholderTextColor={greyColor}
                onChangeText={value => this.props.inputChangedLogin({ type: 'email', value })}
                enablesReturnKeyAutomatically
                underlineColorAndroid="transparent"
              />
            </View>

            <View style={textInputCombined}>
              <Icon style={textFieldIcon} name="lock" size={16} color={greyColor} />
              <TextInput
                autoCorrect={false}
                style={input}
                placeholder={'Password'}
                placeholderTextColor={greyColor}
                onChangeText={value => this.props.inputChangedLogin({ type: 'password', value })}
                secureTextEntry
                returnKeyType={'done'}
                enablesReturnKeyAutomatically
                underlineColorAndroid="transparent"
              />
            </View>

            <View style={buttonHolder}>
              {this.renderButton()}
            </View>
          </View>
        </BackgroundImage>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = {
  imageBackground: {
    flexDirection: 'column',
  },

  logo: {
    flex: 1,
    marginTop: 30,
    alignSelf: 'center',
  },

  logoImage: {
    width: 70,
    height: 100
  },

  loginSection: {
    flexGrow: 0,
    flexShrink: 0,
    marginBottom: 50,
    marginLeft: 30,
    marginRight: 30
  },

  input: {
    flex: 1,
    borderColor: 'transparent',
    alignSelf: 'stretch',
    height: 50,
    padding: 0,
    paddingLeft: 20,
    margin: 0,
    borderWidth: 0,
    color: greyColor,
    fontSize: 16,
    fontWeight: '300',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
  },

  textInputCombined: {
    height: 50,
    marginTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.58)',
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textFieldIcon: {
    paddingLeft: 30
  },

  button: {
    alignSelf: 'center',
    fontSize: 16,
    color: greyColor
  },

  linearGradient: {
    justifyContent: 'center',
    borderRadius: 100,
    height: 50,
  },

  buttonHolder: {
    marginTop: 30
  },

  error: {
    color: greyColor,
    alignSelf: 'center',
    marginTop: 10
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, { inputChangedLogin, loginUser })(LoginForm);
