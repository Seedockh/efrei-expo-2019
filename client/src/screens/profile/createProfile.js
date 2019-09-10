import React from 'react';
import { Provider, Button } from 'react-native-paper';
import ProfileForm from '../../components/profileForm';
import { useStateValue } from '../../hooks/state';

const Screen = ({ navigation }) => {
    const [{ isLogged }, dispatch] = useStateValue();

    const createProfile = () => {
        // If user data are ok and user not already exists:
        dispatch({
            type: 'setState',
            state: 'isLogged',
            value: true
        })
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