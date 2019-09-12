import { StyleSheet } from 'react-native'

const navigation = {
  header: {
    headerStyle: {
      backgroundColor: "#253140",
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
    }
  },
  tabBar: {
      activeTintColor: '#b5423c',
      inactiveTintColor: 'white',
      labelStyle: {
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 15
      },
      tabStyle: {
        padding: 0,
        backgroundColor: "#253140",
      },
      style: {
        padding: 0,
      },
  },
}

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

export default { main, navigation }
