import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    marginLeft: -100,
    justifyContent: 'center',
    backgroundColor: '#c62828'
  },
  delete__cell: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  delete__text: {
    margin: 16,
    color: '#ffffff'
  },
  itemText: {
    fontSize: 15,
    color: '#212121'
  },
  inner__view: {
    flexDirection: 'row',
    marginLeft: 100,
    padding: 10,
    justifyContent: 'space-between'
  }
});
