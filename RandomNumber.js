import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

class RandomNumber extends React.Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
  };
  handlePress = () => {
    console.log(this.props.number);
  };
  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text style={[styles.each, this.props.isSelected && styles.selected]}>{this.props.number}</Text>
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
  selected: {
    opacity: .3,
  }
});

export default RandomNumber;
