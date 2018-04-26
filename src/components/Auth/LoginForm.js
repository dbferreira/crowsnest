import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, BackHandler, Keyboard, TextInput, Text, TouchableOpacity, View, ActivityIndicator, KeyboardAvoidingView, Platform, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
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
          onPress={this.onButtonPress.bind(this)}>
          <LinearGradient colors={['#2980b9', '#2C3E50']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.linearGradient}>
            <Text style={styles.buttonStyle}>Sign In</Text>
          </LinearGradient>
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
          <View style={styles.logo}>
            <Image
              style={styles.logoImage}
              source={require('./Logo.png')}
            />
          </View>
          <View style={styles.loginSectionStyle}>
            <View style={styles.textInputCombined}>
              <Icon style={styles.textFieldIcon} name="user" size={18} color="#ECF0F1" />
              <TextInput
                autoCorrect={false}
                returnKeyType={'next'}
                keyboardType={'email-address'}
                style={styles.inputStyle}
                placeholder={'Username'}
                placeholderTextColor={'#ECF0F1'}
                onChangeText={value => this.props.inputChangedLogin({ type: 'email', value })}
                enablesReturnKeyAutomatically
                underlineColorAndroid="transparent"
              />
            </View>

            <View style={styles.textInputCombined}>
              <Icon style={styles.textFieldIcon} name="lock" size={16} color="#ECF0F1" />
              <TextInput
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder={'Password'}
                placeholderTextColor={'#ECF0F1'}
                onChangeText={value => this.props.inputChangedLogin({ type: 'password', value })}
                secureTextEntry
                returnKeyType={'done'}
                enablesReturnKeyAutomatically
                underlineColorAndroid="transparent"
              />
            </View>

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

  loginSectionStyle: {
    flexGrow: 0,
    flexShrink: 0,
    marginBottom: 50,
    marginLeft: 30,
    marginRight: 30
  },

  inputStyle: {
    flex: 1,
    borderColor: 'transparent',
    alignSelf: 'stretch',
    height: 50,
    padding: 0,
    margin: 0,
    borderWidth: 0,
    color: '#ECF0F1',
    fontSize: 16,
    fontWeight: '300',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    paddingLeft: 20
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

  buttonStyle: {
    alignSelf: 'center',
    lineHeight: 50,
    fontSize: 16,
    color: "#ECF0F1"
  },

  linearGradient: {
    borderRadius: 100,
    height: 50,
  },

  buttonHolderStyle: {
    marginTop: 30
  },

  errorStyle: {
    color: '#ECF0F1',
    alignSelf: 'center',
    marginTop: 10
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, { inputChangedLogin, loginUser })(LoginForm);
