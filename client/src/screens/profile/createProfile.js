import React from 'react';
import { Provider, Button } from 'react-native-paper';
import ProfileForm from '../../components/profileForm';
import { useStateValue } from '../../hooks/state';
import * as mutations from '../../apollo/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';

const Screen = ({ navigation }) => {
    const [{ isLogged, firstName, lastName, city }, dispatch] = useStateValue();
    
    const [createUser, {
		data: mutationData
    }] = useMutation(mutations.CREATE_USER);

    const createProfile = async () => {
        await dispatch({
            type: 'setState',
            state: 'isLogged',
            value: true
        })
        await createUser({
			variables: {
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
            <Button icon="send" mode="contained" onPress={createProfile}>Create</Button>
        </Provider>
    )
}

Screen.navigationOptions = {
    title: 'Create Profile'
}

export default Screen;