import React from 'react';
import { Provider, Button } from 'react-native-paper';
import { View, Alert } from 'react-native';
import ProfileForm from '../../components/profileForm';
import { useStateValue } from '../../hooks/state';
import * as mutations from '../../apollo/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Style from '../../styles';

const Screen = ({ navigation }) => {
    const [{ isLogged, firstName, lastName, city, id, image }, dispatch] = useStateValue();
    const [editUser, { data: mutationData }] = useMutation(mutations.EDIT_USER);

    const editProfile = async () => {
      if (!firstName || !lastName || !city || firstName.length<3 || lastName.length<3 || city.length<3 ) {
        return Alert.alert(
          'Whoops !',
          'All fields are required and must be at least 3 characters long !',
          [
            { text: 'Try again' }
          ],
          { cancelable: false },
        );
      }

      if (!image) {
        dispatch({
            type: 'setState',
            state: 'image',
            value: 'https://lebonangle-bucket.s3.eu-west-3.amazonaws.com/images/icon.png'
        });
      }

      await editUser({
  			variables: {
          id,
  				data: {
  					firstname: firstName,
            lastname: lastName,
            city,
            image: image,
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
