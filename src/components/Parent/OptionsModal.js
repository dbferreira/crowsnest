import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
// import { Icon, TouchableOpacity, Text } from '@shoutem/ui';
import { View, TouchableOpacity, Text } from 'react-native';
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
            {/* <Icon name="user-profile" style={styles.itemIconStyle} /> */}
            <Text style={styles.itemIconStyle}>0</Text>
            <Text style={styles.itemTextStyle}>LOGIN AS CHILD</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.logout.bind(this)}
            style={styles.itemStyle}
          >
            <Text style={styles.itemIconStyle}>Lock</Text>
            {/* <Icon name="lock" style={styles.itemIconStyle} /> */}
            <Text style={styles.itemTextStyle}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={this.closeModalDialog.bind(this)}
          >
            <Text style={{ color: '#3498db' }}>X</Text>
            {/* <Icon name="close" style={{ color: '#3498db' }} /> */}
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
  },

  itemIconStyle: {
    color: '#aaa'
  },

  itemTextStyle: {
    alignSelf: 'center',
    marginLeft: 10
  }

};

export default connect(null, { logoutUser })(OptionsModal);
