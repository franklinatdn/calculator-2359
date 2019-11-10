import {reducer, calculate} from '../reducer';

describe('test reducer', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      expression: '',
      lastResult: '0',
    });
  });

  it('should handle ADD_STRING', () => {
    expect(
      reducer(
        {
          expression: '',
          lastResult: '0',
        },
        {
          type: 'ADD_STRING',
          value: '1+',
        },
      ),
    ).toEqual({
      expression: '1+',
      lastResult: '0',
    });

    expect(
      reducer(
        {
          expression: '1+',
          lastResult: '0',
        },
        {
          type: 'ADD_STRING',
          value: '2-',
        },
      ),
    ).toEqual({
      expression: '1+2-',
      lastResult: '0',
    });

    expect(
      reducer(
        {
          expression: '1+2-',
          lastResult: '0',
        },
        {
          type: 'ADD_STRING',
          value: '3*',
        },
      ),
    ).toEqual({
      expression: '1+2-3*',
      lastResult: '0',
    });

    expect(
      reducer(
        {
          expression: '1+2-3*',
          lastResult: '0',
        },
        {
          type: 'ADD_STRING',
          value: '4',
        },
      ),
    ).toEqual({
      expression: '1+2-3*4',
      lastResult: '0',
    });
  });

  it('should handle CALCULATE', () => {
    expect(
      reducer(
        {
          expression: '1+2-3*4',
          lastResult: '0',
        },
        {
          type: 'CALCULATE',
        },
      ),
    ).toEqual({
      expression: '',
      lastResult: '-9',
    });
  });

  it('should handle ERASE', () => {
    expect(
      reducer(
        {
          expression: '1+2-3*4',
          lastResult: '0',
        },
        {
          type: 'ERASE',
        },
      ),
    ).toEqual({
      expression: '',
      lastResult: '0',
    });
    expect(
      reducer(
        {
          expression: '',
          lastResult: '-9',
        },
        {
          type: 'ERASE',
        },
      ),
    ).toEqual({
      expression: '',
      lastResult: '0',
    });
  });

  it('test calculate func', () => {
    let result = calculate('-1-2*3');
    expect(result).toEqual('-7');

    let result2 = calculate('-1.1+2.2-3');
    expect(result2).toEqual('-1.9');
  });
});
