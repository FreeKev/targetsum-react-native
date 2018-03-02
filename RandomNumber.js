import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

class RandomNumber extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
  };
  handlePress = () => {
    // console.log(this.props.number);
    if (this.props.isDisabled){ return; }
    this.props.onPress(this.props.id)
  };
  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text style={[styles.each, this.props.isDisabled && styles.disabled]}>{this.props.number}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  each: {
    backgroundColor: 'steelblue',
    textAlign: 'center',
    fontSize: 30,
    width: 100,
    height: 100,
    margin: 15,
  },
  disabled: {
    opacity: .3,
  }
});

export default RandomNumber;
