import React from 'react';
import { Button } from 'react-native-paper';
import { View, Text } from 'react-native';

const Disconnected = ({ navigation }) => {
    return (
        <View>
            <Text>You must be logged in to use this app</Text>
            <Button icon="edit" mode="contained" onPress={() => navigation.navigate('createProfile')}>Create a new profile</Button>
        </View>
    );
}

export default Disconnected;