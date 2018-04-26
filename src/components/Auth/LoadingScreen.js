import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, Text, View, ImageBackground } from 'react-native';
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
          source={require('./loginBackground.jpg')} // eslint-disable-line global-require
        >
        </ImageBackground>
      </View>
    );
  }
}

const win = Dimensions.get('window');

const styles = {
  imageBackgroundStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: win.height,
    width: win.width
  }
};

export default connect(null, { autoLogin })(LoadingScreen);
