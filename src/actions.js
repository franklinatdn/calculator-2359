import * as actionTypes from './constants';

export const addString = value => {
  return {
    type: actionTypes.ADD_STRING,
    value,
  };
};

export const calculate = () => {
  return {
    type: actionTypes.CALCULATE,
  };
};

export const erase = () => {
  return {
    type: actionTypes.ERASE,
  };
};
