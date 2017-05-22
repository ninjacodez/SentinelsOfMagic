import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 60,
    paddingBottom: 60,
    justifyContent: 'center',
    backgroundColor: '#00aedb',
  },
  loading: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 35,
    fontWeight: '700',
    fontFamily: 'DamascusBold',
    textShadowColor: '#222222',
    marginVertical: 30,
  },
  createUser: {
    flex: 1,
    paddingHorizontal: 60,
    paddingTop: 60,
    backgroundColor: '#00aedb',
  },
  welcome: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: 'DamascusBold',
    fontSize: 20,
    margin: 10,
  },
  button: {
    // textAlign: 'center',
    color: '#333333',
    paddingHorizontal: 40,
  },
  textStyle: {
    fontSize: 15,
    color: '#ffffff'
  },
  buttonStyle: {
    color: '#0000ff'
  },
  center: {
    alignSelf: 'center'
  },
  header: {
    width: 25,
    height: 25,
    marginRight: 10
  },
  icon: {
    width: 26,
    height: 26,
  },
  btn: {
    width: 50,
    height: 50,
  },
  listView: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#ffffff',
  },
  listViewHighlighted: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#527FE4',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
  separator: {
    height: 0,
    backgroundColor: '#aaa',
  },
  dropdown: {
    alignSelf: 'center',
    width: 160,
    borderWidth: 0,
    borderRadius: 2,
    backgroundColor: '#ffc425',
    shadowColor: '#666',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
  },
  dropdownText: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  dropdownBox: {
    width: 160,
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 3,
  },
});

export default styles;
