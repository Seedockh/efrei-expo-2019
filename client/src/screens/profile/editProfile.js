import React from 'react';
import { Provider, Button } from 'react-native-paper';
import ProfileForm from '../../components/profileForm';
import { useStateValue } from '../../hooks/state';
import * as mutations from '../../apollo/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';

const Screen = ({ navigation }) => {
    const [{ isLogged, firstName, lastName, city, id }, dispatch] = useStateValue();

    const [editUser, {
		data: mutationData
    }] = useMutation(mutations.EDIT_USER);

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
            <ProfileForm/>
            <Button icon="send" mode="contained" onPress={editProfile}>Save</Button>
        </Provider>
    )
}

Screen.navigationOptions = {
    title: 'Edit Profile',
    headerLeft: null
}

export default Screen;
