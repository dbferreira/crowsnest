import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Text } from '@shoutem/ui';
import { TouchableOpacity } from '@shoutem/ui/components/TouchableOpacity';

export class ProfileSelector extends Component {
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

  renderChildItems() {
    return this.props.children.map((c) => {
      return (
        <Text key={c.name}>{c.name}</Text>
      );
    });
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.actionTextStyle}>SELECT PROFILE</Text>
        <View style={styles.optionItemStyle}>
          <TouchableOpacity
            onPress={this.loginParent.bind(this)}
          >
            <Text>PARENT</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionItemStyle}>
          <Text>CHILD</Text>
        </View>
        <View style={{}}>
          {this.renderChildItems()}
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
    fontSize: 20
  },

  optionItemStyle: {
    borderBottomWidth: 1,
    padding: 5,
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
    borderColor: '#eeeeee'
  }
};

const mapStateToProps = ({ parent }) => {
  const { children } = parent;

  return { children };
};


export default connect(mapStateToProps, {})(ProfileSelector);
