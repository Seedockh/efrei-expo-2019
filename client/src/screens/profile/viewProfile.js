import React from 'react';
import { Provider, Text, Button } from 'react-native-paper';
import { View } from 'react-native';
import { useStateValue } from '../../hooks/state';
import Disconnected from '../../components/disconnected';

const Screen = ({ navigation }) => {
    const [{ isLogged, firstName, lastName, city }, dispatch] = useStateValue();

    return (
        <Provider>
            {isLogged && (
                <View>
                    <Text>{firstName}</Text>
                    <Text>{lastName}</Text>
                    <Text>{city}</Text>
                    <Button icon="edit" mode="contained" onPress={() => navigation.navigate('editProfile')}>Edit</Button>
                </View>
            )}
            {!isLogged && (
                <Disconnected navigation={navigation}/>
            )}
        </Provider>
    )
}

Screen.navigationOptions = {
    title: 'Profile'
}

export default Screen;