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
          source={require('./loginBackground.png')} // eslint-disable-line global-require
        >
          <Text
            style={styles.headerStyle}
          >
            CROW&apos;S NEST
            </Text>
        </ImageBackground>
      </View>
    );
  }
}

const win = Dimensions.get('window');

const styles = {
  screenStyle: {
    flex: 1,
  },

  imageBackgroundStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: win.height,
    width: win.width
  },

  headerStyle: {
    backgroundColor: '#ffffffdd',
    borderRadius: 20,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 100,
    fontSize: 25,
    elevation: 5
  }
};

export default connect(null, { autoLogin })(LoadingScreen);
