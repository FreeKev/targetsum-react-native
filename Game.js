import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';

class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
  };
  state = {
    selectedIds: [],
  };
  randomNumbers = Array
    .from({length: this.props.randomNumberCount})
    .map(() => 1 + Math.floor(10*Math.random()));
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
    // shuflle random #s
  isNumberSelected = (numberIndex) => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  }
  selectNumber = (numberIndex) => {
    this.setState((prevState) => {
      return { selectedIds: [...prevState.selectedIds, numberIndex],
       }    })
  };
  gameStatus = () => {
    const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
      return acc + this.randomNumbers[curr];
    }, 0);
    console.log(sumSelected);
    if (sumSelected < this.target) {
      return 'Playing';
    }
    if (sumSelected === this.target) {
      return 'Won';
    }
    if (sumSelected > this.target) {
      return 'Lost';
    }
  }
  render() {
    // this.gameStatus();
    const gameStatus = this.gameStatus();
    return (
      <View style={styles.container}>
        <Text style={styles.target}>{this.target}</Text>
        <View style={styles.out}>
        {this.randomNumbers.map((randomNumber, index) =>
          <RandomNumber
            key={index}
            id={index}
            number={randomNumber}
            isDisabled={this.isNumberSelected(index)}
            onPress={this.selectNumber}
          />
          // <Text style={styles.each} key={index}>{randomNumber}</Text>
        )}
        </View>
        <Text>{gameStatus}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
    paddingTop: 30,
  },
  target: {
    fontSize: 40,
    backgroundColor: '#aaa',
    margin: 50,
    textAlign: 'center',
  },
  out: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  }
});

export default Game;
