import React, { Component } from 'react';
import { View, BackHandler, FlatList, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
// import { Text } from '@shoutem/ui';
// import { TouchableOpacity } from '@shoutem/ui/components/TouchableOpacity';
import BasicListItem from '../Parent/BasicListItem';

class ProfileSelector extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

  onBackPress() {
    return true;
  }

  loginParent() {
    const { navigate } = this.props.navigation;
    navigate('ParentHome');
  }

  loginChild() {
    const { navigate } = this.props.navigation;
    navigate('ChildHome');
  }

  renderEmptyList() {
    return (
      <Text>-</Text>
    );
  }

  renderChildren() {
    const { children } = this.props;
    return (
      <FlatList
        data={children}
        renderItem={({ item }) =>
          (
            <TouchableOpacity
              onPress={this.loginChild.bind(this)}
            >
              <Text style={styles.childrenTextStyle}>{item.name}</Text>
            </TouchableOpacity>
          )}
      />
    );
  }

  render() {
    const { containerStyle, actionTextStyle, optionItemStyle, headingTextStyle, childrenContainerStyle } = styles;
    return (
      <View style={containerStyle}>
        <View style={{ flex: 0.1 }}>
          <Text style={actionTextStyle}>SELECT PROFILE</Text>
        </View>
        <View style={{ ...optionItemStyle, flex: 0.1 }}>
          <TouchableOpacity
            onPress={this.loginParent.bind(this)}
          >
            <Text style={headingTextStyle}>PARENT</Text>
          </TouchableOpacity>
        </View>
        <View style={{ ...optionItemStyle, flex: 0.1 }}>
          <Text style={headingTextStyle}>CHILD</Text>
        </View>
        <View style={{ ...childrenContainerStyle, flex: 0.6 }}>
          {this.renderChildren()}
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },

  actionTextStyle: {
    marginBottom: 40,
    fontSize: 14
  },

  optionItemStyle: {
    // borderBottomWidth: 1,
    padding: 5,
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
    borderColor: '#aaaaaa'
  },

  childrenContainerStyle: {
    width: '100%'
  },

  headingTextStyle: {
    fontSize: 25
  },

  childrenTextStyle: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10
  }
};

const mapStateToProps = ({ parent }) => {
  const { children } = parent;

  return { children };
};


export default connect(mapStateToProps, {})(ProfileSelector);
