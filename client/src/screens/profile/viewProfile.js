import React from 'react';
import { Provider, Text, Button } from 'react-native-paper';
import { View } from 'react-native';
import { useStateValue } from '../../hooks/state';
import Disconnected from '../../components/disconnected';
import Style from '../../styles'

const Screen = ({ navigation }) => {
    const [{ isLogged, firstName, lastName, city }, dispatch] = useStateValue();

    return (
        <Provider>
            {isLogged && (
                <View style={Style.main.container}>
                  <View style={Style.main.userSection}>
                    <Text style={Style.main.smallTitle}>{firstName}</Text>
                    <Text style={Style.main.smallTitle}>{lastName}</Text>
                    <Text style={Style.main.smallTitle}>{city}</Text>
                  </View>
                  <View style={Style.main.section}>
                    <Button style={Style.main.button} icon="edit" mode="contained" onPress={() => navigation.navigate('editProfile')}>Edit</Button>
                  </View>
                </View>
            )}
            {!isLogged && (
                <Disconnected navigation={navigation}/>
            )}
        </Provider>
    )
}

export default Screen;
