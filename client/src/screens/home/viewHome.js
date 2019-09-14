import React from 'react';
import { Provider, Text, Button } from 'react-native-paper';
import { View } from 'react-native';
import { useStateValue } from '../../hooks/state';
import Style from '../../styles';

const Screen = ({ navigation }) => {
    const [{ isLogged, firstName, lastName, city }, dispatch] = useStateValue();

    const logout = async () => {
      await dispatch({
          type: 'setState',
          state: 'isLogged',
          value: false
      });
      await dispatch({
          type: 'setState',
          state: 'id',
          value: null
      });
      await dispatch({
          type: 'setState',
          state: 'firstName',
          value: ''
      });
      await dispatch({
          type: 'setState',
          state: 'lastName',
          value: ''
      });
      await dispatch({
          type: 'setState',
          state: 'city',
          value: ''
      });
      navigation.navigate('login');
    }

    return (
      <Provider>
          <View style={Style.main.container}>
              <Text style={Style.main.bigTitle}>Welcome home, {firstName} :)</Text>
              <Button style={Style.main.button} mode="contained" onPress={logout}> Logout </Button>
          </View>
      </Provider>
    )
}

export default Screen;
