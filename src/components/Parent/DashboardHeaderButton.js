import React, { Component } from 'react';
import { Icon, TouchableOpacity } from '@shoutem/ui';

export default class DashboardHeaderButton extends Component {
  showSettings() {
    console.log('Show settings...');
  }

  render() {
    return (
      <TouchableOpacity onPress={this.showSettings.bind(this)}>
        <Icon name="more-horizontal" style={styles.iconStyle} />
      </TouchableOpacity>
    );
  }
}

const styles = {
  iconStyle: {
    marginRight: 10
  }
};

