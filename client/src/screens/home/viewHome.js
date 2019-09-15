import React, { useEffect } from 'react';
import { Provider, Text, Button, Card, Title } from 'react-native-paper';
import { View, ScrollView } from 'react-native';
import { useStateValue } from '../../hooks/state';
import { useQuery } from '@apollo/react-hooks';
import * as queries from '../../apollo/queries';
import Style from '../../styles';

const Screen = ({ navigation }) => {
    const [{ isLogged, id, firstName, lastName, city }, dispatch] = useStateValue();
    const { data } = useQuery(queries.GET_USER_INTERESTS, {
  		variables: {
  			UserId: id
  		}
	  });

    useEffect( () => {
      if (data) {
        console.log(data.interestsByUser);
        dispatch({
          type: 'setState',
          state: 'interests',
          value: data.interestsByUser,
        })
      }
    }, [data])

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
              <Text style={[Style.main.smallTitle, {marginTop: 20}]}>Posts you were interesed in : </Text>
              <ScrollView style={Style.main.productsList}>
                {data && data.interestsByUser.map((interest, index) => {
                    return (
                      <Card key={index} style={Style.main.card}>
                        <Card.Content style={Style.main.cardHeader}>
                          <Title style={Style.main.cardTitle}>{interest.PostId}</Title>
                        </Card.Content>
                        <Card.Actions>
                          <Button color='white' onPress={() => navigation.navigate('viewProduct', { productId: interest.PostId })}  dark={true}>See post</Button>
                        </Card.Actions>
                      </Card> )
                })}
              </ScrollView>
          </View>
      </Provider>
    )
}

export default Screen;
