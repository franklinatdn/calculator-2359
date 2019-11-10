import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
  },
  vTop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  vBottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtDisplay: {
    alignSelf: 'flex-end',
    fontSize: 30,
  },
  colButtons: {
    flex: 1,
  },
  vButton: {
    flex: 1,
    backgroundColor: '#DDDDDD',
    margin: '4%',
    borderRadius: 5,
    justifyContent: 'center',
  },
  txtValue: {
    fontSize: 20,
    textAlign: 'center',
  },
});
