import React, { useState } from 'react';
import { View } from 'react-native';
import { Provider, Button, TextInput, Text, ProgressBar } from 'react-native-paper';
import { useStateValue } from '../../hooks/state';
import * as mutations from '../../apollo/mutations';
import { useMutation } from '@apollo/react-hooks';
import Style from '../../styles';

const Screen = ({ navigation }) => {
    const [{ isLogged, firstName, lastName, city, id }, dispatch] = useStateValue();
    const [currentFirstName, setCurrentFirstName] = useState();
    const [currentLastName, setCurrentLastName] = useState();
    const [currentCity, setCurrentCity] = useState();
    const [getRegister, { loading, error, data }] = useMutation(mutations.CREATE_USER)

    if (data && data.createUser && !isLogged) {
      dispatch({
          type: 'setState',
          state: 'id',
          value: data.createUser.id
      });
      dispatch({
          type: 'setState',
          state: 'firstName',
          value: data.createUser.firstname
      });
      dispatch({
          type: 'setState',
          state: 'lastName',
          value: data.createUser.lastname
      });
      dispatch({
          type: 'setState',
          state: 'city',
          value: data.createUser.city
      });
      dispatch({
          type: 'setState',
          state: 'isLogged',
          value: true
      });
    }

    const register = () => {
      getRegister({
        variables: {
          data: {
            firstname: currentFirstName,
            lastname: currentLastName,
            city: currentCity
          }
        }
      })
      navigation.navigate('tabNavigator');
    }

    const goToLogin = () => {
      navigation.navigate('login');
    }

    return (
        <Provider>
          <View style={Style.main.container}>
            <Text style={Style.main.bigTitle}>Register</Text>
            {loading &&
              <ProgressBar progress={0.5} color='white' />
            }
            {!loading &&
              <>
                <View style={Style.main.section}>
                  <TextInput
                      style={Style.main.input}
                      label='First Name'
                      value={currentFirstName}
                      underlineColor='transparent'
                      onChangeText={text => setCurrentFirstName(text)}
                  />
                  <TextInput
                      style={Style.main.input}
                      label='Last Name'
                      value={currentLastName}
                      underlineColor='transparent'
                      onChangeText={text => setCurrentLastName(text)}
                  />
                  <TextInput
                      style={Style.main.input}
                      label='City'
                      value={currentCity}
                      underlineColor='transparent'
                      onChangeText={text => setCurrentCity(text)}
                  />
                </View>
                <View style={Style.main.section}>
                  <Button style={Style.main.button} icon="send" mode="contained" onPress={register}>Create</Button>
                  <Button style={Style.main.button} icon="cancel" mode="contained" onPress={goToLogin}>Back</Button>
                </View>
              </>
            }
          </View>
        </Provider>
    )
}

export default Screen;
