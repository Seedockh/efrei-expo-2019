import React, { useState, useEffect } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { Provider, TextInput, Text, Button, ProgressBar } from 'react-native-paper';
import { useStateValue } from '../../hooks/state';
import { useLazyQuery } from '@apollo/react-hooks';
import * as queries from '../../apollo/queries';
import Style from '../../styles';

console.disableYellowBox = true;

const Screen = ({ navigation }) => {
    const [{ isLogged, isLoading, firstName, lastName, city, image, id }, dispatch] = useStateValue();
    const [currentFirstName, setCurrentFirstName] = useState("");
    const [currentLastName, setCurrentLastName] = useState("");
    const [getLogin, { loading, error, data }] = useLazyQuery(queries.LOGIN)

    useEffect(()=> {
      dispatch({
          type: 'setState',
          state: 'isLoading',
          value: loading
      });

      if (data && data.login && !isLogged) {
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
            state: 'image',
            value: data.login.image
        });
        dispatch({
            type: 'setState',
            state: 'isLogged',
            value: true
        });
        navigation.navigate('tabNavigator')
      }

      if (error) {
        return Alert.alert(
          'Whoops !',
          error.graphQLErrors[0].message,
          [
            { text: 'Try again' }
          ],
          { cancelable: false },
        );
      }
    }, [data, error, loading])

    const login = () => {
      if (!currentFirstName || !currentLastName || currentFirstName.length<3 || currentLastName.length<3) {
        return Alert.alert(
          'Whoops !',
          'All fields are required !',
          [
            { text: 'Try again' }
          ],
          { cancelable: false },
        );
      }

      getLogin(
        { variables:
          { firstname: currentFirstName, lastname: currentLastName },
        },
        { errorPolicy: "all", fetchPolicy: "no-cache" }
      )
    }

    const register = () => {
      navigation.navigate('register')
    }

    const reset = () => {
      dispatch({
          type: 'setState',
          state: 'isLoading',
          value: false
      });
      dispatch({
          type: 'setState',
          state: 'id',
          value: null
      });
      dispatch({
          type: 'setState',
          state: 'firstName',
          value: ""
      });
      dispatch({
          type: 'setState',
          state: 'lastName',
          value: ""
      });
      dispatch({
          type: 'setState',
          state: 'city',
          value: ""
      });
      dispatch({
          type: 'setState',
          state: 'image',
          value: ""
      });
      dispatch({
          type: 'setState',
          state: 'isLogged',
          value: false
      });
    }

    return (
        <ScrollView contentContainerStyle={Style.main.container}>
          <Text style={Style.main.bigTitle}>Login</Text>
          {isLoading &&
            <>
              <ProgressBar progress={0.5} color='white' />
              <Button style={[Style.main.button, {marginTop: 50}]} mode="contained" onPress={reset}> Loading stuck ? </Button>
            </>
          }
          {!isLoading &&
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
              <Button style={Style.main.button} mode="contained" onPress={register}> Register </Button>
            </View>
            </>
          }
        </ScrollView>
    );
}

export default Screen;
