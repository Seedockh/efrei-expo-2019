import { StyleSheet } from 'react-native'

const main = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#253140",
  },
  section: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 25,
  },
  bigTitle: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  button: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#b5423c',
    marginBottom: 10,
  },
  text: {
    color: 'white',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    borderRadius: 3,
  },
});

export default { main }
