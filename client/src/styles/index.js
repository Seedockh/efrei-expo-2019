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
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    backgroundColor: '#b5423c',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  text: {
    color: 'white',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    borderRadius: 3,
  },
  productsList: {
    width: '90%',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#3b465c',
    marginVertical: 15,
    borderRadius: 7,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#5f7195',
  },
  cardTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: ''
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    padding: 5,
    marginTop: 3,
    height: 30,
    fontSize: 15,
    borderRadius: 7,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b5423c',
    fontWeight: 'bold',
  },
  cardCover: {
    marginVertical: 10,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderColor: '#253140',
  },
  filterTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: ''
  },
  picker: {
    width: '100%',
    backgroundColor: '#ffe07c',
    opacity: 0.8,
  },
  pickerItem: {
    //backgroundColor: '#ffe07c',
    //color: '#5f7195',
  }
});

export default { main, navigation }
