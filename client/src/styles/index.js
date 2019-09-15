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
  detailContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: "#253140",
  },
  section: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 25,
  },
  rowSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
  },
  userSection: {
    width: '80%',
    flexDirection: 'row',
    backgroundColor: '#3b465c',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 7,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#5f7195',
  },
  leftColumn: {
    width: '40%',
  },
  rightColumn: {
    width: '40%',
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  postUserImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  bigTitle: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  midTitle: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  smallTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 0,
  },
  button: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#b5423c',
    marginBottom: 10,
  },
  interestButton: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#1e834b',
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
  textRed: {
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
  textSkin: {
    padding: 5,
    marginTop: 3,
    height: 30,
    fontSize: 15,
    borderRadius: 7,
    color: '#253140',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fec495',
    fontWeight: 'bold',
  },
  textCandy: {
    padding: 5,
    marginTop: 3,
    height: 30,
    fontSize: 15,
    borderRadius: 7,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fb4a75',
    fontWeight: 'bold',
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
  pickerWrapper: {
    width: '90%',
    borderWidth: 5,
    borderColor: '#5f7195',
    borderRadius: 7,
  },
  postPickerWrapper: {
    width: '80%',
    borderWidth: 5,
    borderColor: '#5f7195',
    borderRadius: 3,
    marginBottom: 10
  },
  picker: {
    width: '100%',
    backgroundColor: '#5f7195',
    opacity: 0.8,
  },
  postPicker: {
    width: '100%',
    backgroundColor: '#5f7195',
    opacity: 0.8,
  },
  postItem: {
    backgroundColor: 'green',
  },
  list: {
    width: '90%',
  }
});

export default { main, navigation }
