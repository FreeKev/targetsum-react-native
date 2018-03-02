import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';

class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
  };
  state = {
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds,
  };
  randomNumbers = Array
    .from({length: this.props.randomNumberCount})
    .map(() => 1 + Math.floor(10*Math.random()));
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        return {remainingSeconds: prevState.remainingSeconds - 1};
      }, () => {
        if (this.state.remainingSeconds === 0) {
          clearInterval(this.intervalId);
        }
      });
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

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
    if (this.state.remainingSeconds === 0) {
      return 'Lost';
    }
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
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
        <View style={styles.out}>
        {this.randomNumbers.map((randomNumber, index) =>
          <RandomNumber
            key={index}
            id={index}
            number={randomNumber}
            isDisabled={this.isNumberSelected(index) || gameStatus !== 'Playing'}
            onPress={this.selectNumber}
          />
          // <Text style={styles.each} key={index}>{randomNumber}</Text>
        )}
        </View>
        <Text>{this.state.remainingSeconds}</Text>
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
  },
  STATUS_Playing: {
    backgroundColor: '#bbb',
  },
  STATUS_Won: {
    backgroundColor: 'green',
  },
  STATUS_Lost: {
    backgroundColor: 'red',
  },
});

export default Game;
