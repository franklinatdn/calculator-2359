import * as actions from '../actions.js';

describe('test actions', () => {
  it('addString should create ADD_STRING action', () => {
    expect(actions.addString('2/')).toEqual({
      type: 'ADD_STRING',
      value: '2/',
    });
  });

  it('calculate should create CALCULATE action', () => {
    expect(actions.calculate()).toEqual({
      type: 'CALCULATE',
    });
  });

  it('erase should create ERASE action', () => {
    expect(actions.erase(1)).toEqual({
      type: 'ERASE',
    });
  });
});
