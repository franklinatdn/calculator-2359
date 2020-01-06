import {createStore} from 'redux';
import * as actionTypes from './constants';

const initialState = {
  expression: '',
  lastResult: '0',
};

export const calculate = expression => {
  let onlyDigitPatt = new RegExp('^[-]?\\d+([.]\\d+)?$');
  if (expression.match(/[/]0[.]?(?![.]|[0-9]+)/)) {
    return expression + '\n Can not divide 0';
  }
  while (expression.match(onlyDigitPatt) == null) {
    let isMultiOrDivPatt = new RegExp(
      '(\\d+([.]\\d+)?)([*|/])(\\d+([.]\\d+)?)',
    );
    const match = expression.match(isMultiOrDivPatt);
    if (match) {
      let aStepResult =
        match[3] === '*'
          ? parseFloat(match[1]) * parseFloat(match[4])
          : parseFloat(match[1]) / parseFloat(match[4]);
      expression = expression.replace(match[0], aStepResult);
    } else {
      let isAddOrSubPatt = expression.match(/[-+]?\d+([.]\d+)?/g);
      let aStepResult = 0;
      for (let i = 0; i < isAddOrSubPatt.length; i++) {
        aStepResult += parseFloat(isAddOrSubPatt[i]);
      }
      expression = String(aStepResult);
    }
  }
  return expression;
};

export const reducer = (state = Object.assign({}, initialState), action) => {
  switch (action.type) {
    case actionTypes.ADD_STRING:
      return {
        ...state,
        expression: action.value.match(/^([+]|[-]|[*]|[/])/g)
          ? (state.expression === ''
              ? state.lastResult.match(/[a-z]/)
                ? '0'
                : state.lastResult
              : state.expression.slice(0, state.expression.length - 1)) +
            action.value
          : state.expression + action.value,
      };
    case actionTypes.CALCULATE:
      return {
        ...state,
        expression: '',
        lastResult: calculate(state.expression),
      };
    case actionTypes.ERASE:
      return Object.assign({}, initialState);
    default:
      return state;
  }
};

const rootStore = createStore(reducer);

export const store = rootStore;
