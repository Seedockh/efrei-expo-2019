import React from 'react';
import { Provider, Button } from 'react-native-paper';
import { View } from 'react-native';
import ProfileForm from '../../components/profileForm';
import { useStateValue } from '../../hooks/state';
import * as mutations from '../../apollo/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Style from '../../styles';

const Screen = ({ navigation }) => {
    const [{ isLogged, firstName, lastName, city, id }, dispatch] = useStateValue();

    const [editUser, { data: mutationData }] = useMutation(mutations.EDIT_USER);

    const editProfile = async () => {
      await dispatch({
          type: 'setState',
          state: 'isLogged',
          value: true
      })
      await editUser({
  			variables: {
          id,
  				data: {
  					firstname: firstName,
            lastname: lastName,
            city
  				}
  			},
		   });
      navigation.goBack();
    }

    return (
        <Provider>
          <View style={Style.main.container}>
            <ProfileForm/>
            <Button style={Style.main.button} icon="send" mode="contained" onPress={editProfile}>Save</Button>
            <Button style={Style.main.button} icon="cancel" mode="contained" onPress={()=>navigation.goBack()}>Cancel</Button>
          </View>
        </Provider>
    )
}

Screen.navigationOptions = {
    headerLeft: null
}

export default Screen;
