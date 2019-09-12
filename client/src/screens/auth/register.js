import React, { useState } from 'react';
import { View } from 'react-native';
import { Provider, Button, TextInput, Text } from 'react-native-paper';
import { useStateValue } from '../../hooks/state';
import * as mutations from '../../apollo/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Style from '../../styles';

const Screen = ({ navigation }) => {
    const [{ isLogged, firstName, lastName, city, id }, dispatch] = useStateValue();
    const [currentFirstName, setCurrentFirstName] = useState();
    const [currentLastName, setCurrentLastName] = useState();
    const [currentCity, setCurrentCity] = useState();

    const [createUser, { data: mutationData }] = useMutation(mutations.CREATE_USER);

    const createProfile = async () => {
        const result = await createUser({
    			variables: {
    				data: {
    					firstname: currentFirstName,
              lastname: currentLastName,
              city: currentCity
    				}
          }
        })

        dispatch({
            type: 'setState',
            state: 'id',
            value: result.data.createUser.id
        });
        dispatch({
            type: 'setState',
            state: 'firstName',
            value: result.data.createUser.firstname
        });
        dispatch({
            type: 'setState',
            state: 'lastName',
            value: result.data.createUser.lastname
        });
        dispatch({
            type: 'setState',
            state: 'city',
            value: result.data.createUser.city
        });
        dispatch({
            type: 'setState',
            state: 'isLogged',
            value: true
        });
        navigation.navigate('tabNavigator');
    }

    return (
        <Provider>
          <View style={Style.main.container}>
            <Text style={Style.main.bigTitle}>Register</Text>
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
              <Button style={Style.main.button} icon="send" mode="contained" onPress={createProfile}>Create</Button>
            </View>
          </View>
        </Provider>
    )
}

export default Screen;
