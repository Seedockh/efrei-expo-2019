import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Provider, TextInput, Text, Button, ProgressBar } from 'react-native-paper';
import { useStateValue } from '../../../hooks/state';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Style from '../../../styles';

const Login = ({ navigation }) => {
    const [{ isLogged, firstName, lastName, city, id }, dispatch] = useStateValue();
    const [currentFirstName, setCurrentFirstName] = useState();
    const [currentLastName, setCurrentLastName] = useState();
    const [result, setResult] = useState(null);

    const LOGIN = gql`
      query login($firstname: String!, $lastname: String!) {
        login(data: {
          firstname: $firstname
          lastname: $lastname
        }) {
          id
          firstname
          lastname
          city
        }
      }
    `
    const [getLogin, { loading, data }] = useLazyQuery(LOGIN)

    if (data && data.login) {
      dispatch({
          type: 'setState',
          state: 'id',
          value: data.login.id
      });
      dispatch({
          type: 'setState',
          state: 'firstName',
          value: data.login.firstname
      });
      dispatch({
          type: 'setState',
          state: 'lastName',
          value: data.login.lastname
      });
      dispatch({
          type: 'setState',
          state: 'city',
          value: data.login.city
      });
      dispatch({
          type: 'setState',
          state: 'isLogged',
          value: true
      });
    }

    const login = () => {
      getLogin({
        variables: {
          firstname: currentFirstName,
          lastname: currentLastName
        }
      })
    }

    return (
        <ScrollView contentContainerStyle={Style.main.container}>
          <Text style={Style.main.bigTitle}>Login</Text>
          {loading &&
            <ProgressBar progress={0.5} color='white' />
          }
          {!loading &&
            <>
            <View style={Style.main.section}>
              <TextInput
                style={Style.main.input}
                label='First name'
                value={currentFirstName}
                underlineColor='transparent'
                onChangeText={text => setCurrentFirstName(text)}
              />
              <TextInput
                style={Style.main.input}
                label='Last name'
                value={currentLastName}
                underlineColor='transparent'
                onChangeText={text => setCurrentLastName(text)}
              />
            </View>
            <View style={Style.main.section}>
              <Button style={Style.main.button} mode="contained" onPress={login}> Login </Button>
              <Button style={Style.main.button} mode="contained" onPress={() => null}> Register </Button>
            </View>
            </>
          }
        </ScrollView>
    );
}

export default Login;
