import React, { PureComponent } from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default class BasicListItem extends PureComponent {
  handlePress() {
    this.props.onPress(this.props.item);
  }

  renderDetails() {
    const { detailsField, item } = this.props;
    if (detailsField) {
      return (
        <Text style={styles.detailsFieldStyle}>{item[detailsField]}</Text>
      );
    }
    return;
  }

  render() {
    const { item, labelKey } = this.props;
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}
        style={styles.itemStyle}
        key={item[labelKey]}
      >
        <Text style={styles.nameStyle}>{item[labelKey]}</Text>
        {this.renderDetails()}
      </TouchableOpacity>
    );
  }
}

const styles = {
  itemStyle: {
    borderBottomWidth: 1,
    padding: 5,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
    flex: 1
  },

  detailsFieldStyle: {
    position: 'absolute',
    alignSelf: 'center',
    right: 10
  },

  nameStyle: {
    fontSize: 16
  }
};
