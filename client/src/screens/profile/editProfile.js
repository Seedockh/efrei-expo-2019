import React from 'react';
import { Provider } from 'react-native-paper';
import ProfileForm from '../../components/profileForm';

const Screen = () => {
    return (
        <Provider>
            <ProfileForm/>
        </Provider>
    )
}

Screen.navigationOptions = {
    title: 'Edit Profile'
}

export default Screen;