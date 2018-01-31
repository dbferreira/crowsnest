import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Icon, TouchableOpacity, Text } from '@shoutem/ui';
import { View } from 'react-native';
import { logoutUser } from '../../store/actions';

class OptionsModal extends Component {
  closeModalDialog() {
    this.props.closeModal();
  }

  logout() {
    this.props.logoutUser();
    this.closeModalDialog();
    NavigationActions.navigate({
      routeName: 'Login'
    });
  }

  render() {
    return (
      <View style={styles.modalStyle}>
        <View style={styles.listStyle}>
          <TouchableOpacity
            onPress={this.logout.bind(this)}
            style={styles.itemStyle}
          >
            <Icon name="lock" style={{ color: '#aaa' }} />
            <Text>LOGOUT</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={this.closeModalDialog.bind(this)}
          >
            <Icon name="close" style={{ color: '#aaa' }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  modalStyle: {
    flex: 1,
    justifyContent: 'center'
  },

  listStyle: {
    justifyContent: 'center',
    flex: 5
  },

  itemStyle: {
    borderBottomWidth: 1,
    padding: 5,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
    borderColor: '#eeeeee'
  }

};

export default connect(null, { logoutUser })(OptionsModal);
