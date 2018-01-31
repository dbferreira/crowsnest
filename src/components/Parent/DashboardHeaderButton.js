import React, { Component } from 'react';
import { Icon, TouchableOpacity } from '@shoutem/ui';
import { View, Modal } from 'react-native';
import OptionsModal from './OptionsModal';

export default class DashboardHeaderButton extends Component {
  state = { modalVisible: false }

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  render() {
    return (
      <View>
        <Modal
          visible={this.state.modalVisible}
          animationType={'fade'}
          onRequestClose={() => this.closeModal()}
        >
          <OptionsModal closeModal={this.closeModal.bind(this)} />
        </Modal>
        <TouchableOpacity onPress={() => this.openModal()}>
          <Icon name="more-horizontal" style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  iconStyle: {
    marginRight: 10
  }
};

