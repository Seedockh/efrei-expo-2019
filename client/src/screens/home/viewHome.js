import React from 'react';
import { Provider, Text, Button } from 'react-native-paper';
import { View } from 'react-native';
import { useStateValue } from '../../hooks/state';
import Login from '../../components/auth/login';
import Style from '../../styles';

const Screen = ({ navigation }) => {
    const [{ isLogged, firstName, lastName, city }, dispatch] = useStateValue();

    const logout = () => {
      dispatch({
          type: 'setState',
          state: 'id',
          value: null
      });
      dispatch({
          type: 'setState',
          state: 'firstName',
          value: ''
      });
      dispatch({
          type: 'setState',
          state: 'lastName',
          value: ''
      });
      dispatch({
          type: 'setState',
          state: 'city',
          value: ''
      });
      dispatch({
          type: 'setState',
          state: 'isLogged',
          value: false
      });
    }

    return (
      <>
				{!isLogged &&
					<Login />
				}
        {isLogged &&
          <Provider>
              <View style={Style.main.container}>
                  <Text style={Style.main.bigTitle}>Welcome home, {firstName} :)</Text>
                  <Button style={Style.main.button} mode="contained" onPress={logout}> Logout </Button>
              </View>
          </Provider>
        }
      </>
    )
}

Screen.navigationOptions = {
    title: 'Home'
}

export default Screen;
