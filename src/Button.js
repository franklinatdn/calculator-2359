import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

function Button({value, handle}) {
  return (
    <TouchableOpacity style={styles.vButton} onPress={() => handle(value)}>
      <Text style={styles.txtValue}>{value}</Text>
    </TouchableOpacity>
  );
}
Button.PropTypes = {
  value: PropTypes.string,
  handle: PropTypes.func,
};

Button.defaultProps = {
  value: '',
  handle: () => {
    console.warn('Please assign me a func!')
  },
};
export default React.memo(Button);
