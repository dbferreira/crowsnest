import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, BackHandler, Keyboard, TextInput, Text, Button, View, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
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
        />
        <Text style={styles.errorStyle}>{this.props.error}</Text>
      </View>
    );
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.screenStyle} behavior="padding" enabled>

      {/* <View style={styles.screenStyle}> */}
        <BackgroundImage
          resizeMode={'cover'}
          style={{ ...styles.imageBackgroundStyle, height: this.state.dimensions.height, width: this.state.dimensions.width }}
          source={require('./loginBackground.png')} // eslint-disable-line global-require
        >
          <View style={styles.loginSectionStyle}>
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

  // headerStyle: {
  //   backgroundColor: '#ffffff',
  //   borderRadius: 20,
  //   padding: 10,
  //   paddingLeft: 30,
  //   paddingRight: 30,
  //   fontSize: 25,
  //   marginBottom: 30,
  //   elevation: 5
  // },

  loginSectionStyle: {
    flexGrow: 0,
    flexShrink: 0,
    // flexBasis: '30%',
    
    marginBottom: 50,
    marginLeft: 30,
    marginRight: 30
    // alignItems: 'center',
    // justifyContent: 'center'
  },

  inputStyle: {
    marginTop: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.58)',
    borderColor: 'transparent',
    alignSelf: 'stretch',
    borderRadius: 100,
    // placeholderTextColor: '#ECF0F1'
  },

  buttonStyle: {
    backgroundColor: '#2980b9',
    borderRadius: 100
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
