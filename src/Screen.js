import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, SafeAreaView} from 'react-native';

import {addString, calculate, erase} from './actions';

import Button from './Button';

import styles from './styles';

const INIT_STATE = {
  valueDisplay: '0',
  newNumber: false,
  operator: null,
};

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, INIT_STATE);
  }

  _handleCalculate = async () => {
    if (!this.state.operator) {
      const {valueDisplay} = this.state;
      this.props.handleAddString(valueDisplay);
      await this.props.handleCalculate();
      this.setState({valueDisplay: this.props.lastResult, newNumber: true});
    } else {
      alert('Please input any digit after operator');
    }
  };

  _handleOperator = operator => {
    const {newNumber, valueDisplay} = this.state;
    this.props.handleAddString(`${!newNumber ? valueDisplay : ''}${operator}`);
    this.setState({newNumber: true, operator});
  };

  _handleErase = () => {
    this.setState(Object.assign({}, INIT_STATE));
    this.props.handleErase();
  };
  _handleBtn = value => {
    const {newNumber, valueDisplay} = this.state;
    switch (value) {
      case String(value.match(/\d/)):
        if (valueDisplay.length >= 10 && !newNumber) {
          return;
        }
        this.setState(prevState => ({
          valueDisplay:
            prevState.valueDisplay === '0' || newNumber
              ? value
              : prevState.valueDisplay.concat(value),
          newNumber: false,
          operator: null,
        }));
        break;
      case '.':
        if (valueDisplay.length >= 10 && !newNumber) {
          return;
        }
        this.setState(prevState => ({
          valueDisplay: newNumber
            ? '0.'
            : prevState.valueDisplay.match(/[.]/g)
            ? prevState.valueDisplay
            : prevState.valueDisplay.concat(value),
          newNumber: false,
          operator: '.',
        }));
        break;
      case String(value.match(/[+]|[-]|[*]|[/]/)):
        this._handleOperator(value);
        break;
      case '=':
        this._handleCalculate();
        break;
      case 'C':
        this._handleErase();
    }
  };

  render() {
    const {valueDisplay} = this.state;
    // const {expression} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.vTop}>
          {/* <Text style={styles.txtDisplay}>{expression}</Text> */}
          <Text style={styles.txtDisplay}>{valueDisplay}</Text>
        </View>
        <View style={styles.vBottom}>
          <View style={styles.colButtons}>
            <Button value="7" handle={this._handleBtn} />
            <Button value="4" handle={this._handleBtn} />
            <Button value="1" handle={this._handleBtn} />
            <Button value="C" handle={this._handleBtn} />
          </View>
          <View style={styles.colButtons}>
            <Button value="8" handle={this._handleBtn} />
            <Button value="5" handle={this._handleBtn} />
            <Button value="2" handle={this._handleBtn} />
            <Button value="0" handle={this._handleBtn} />
          </View>
          <View style={styles.colButtons}>
            <Button value="9" handle={this._handleBtn} />
            <Button value="6" handle={this._handleBtn} />
            <Button value="3" handle={this._handleBtn} />
            <Button value="." handle={this._handleBtn} />
          </View>
          <View style={styles.colButtons}>
            <Button value="/" handle={this._handleBtn} />
            <Button value="*" handle={this._handleBtn} />
            <Button value="+" handle={this._handleBtn} />
            <Button value="-" handle={this._handleBtn} />
            <Button value="=" handle={this._handleBtn} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  expression: state.expression,
  lastResult: state.lastResult,
});

const mapDispatchToProps = dispatch => ({
  handleAddString: value => dispatch(addString(value)),
  handleCalculate: () => dispatch(calculate()),
  handleErase: () => dispatch(erase()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen);
