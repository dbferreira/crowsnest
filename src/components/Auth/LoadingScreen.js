import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import { Text, View, ImageBackground } from '@shoutem/ui';
import { autoLogin } from '../../store/actions';

class LoadingScreen extends Component {
  static navigationOptions = {
    headerMode: 'none',
    header: null
  }

  componentDidMount() {
    const { navigate } = this.props.navigation;
    this.props.autoLogin({ navigate });
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
  }
};

export default connect(null, { autoLogin })(LoadingScreen);
