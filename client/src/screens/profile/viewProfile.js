import React from 'react';
import { Provider, Text, Button, List } from 'react-native-paper';
import { View, FlatList } from 'react-native';
import { useStateValue } from '../../hooks/state';

const Screen = ({ navigation }) => {
    const [{ isLogged, firstName, lastName, city, myProducts }, dispatch] = useStateValue();

    return (
        <Provider>
            {isLogged && (
                <View>
                    <Text>{firstName}</Text>
                    <Text>{lastName}</Text>
                    <Text>{city}</Text>
                    <Button icon="edit" mode="contained" onPress={() => navigation.navigate('editProfile')}>Edit</Button>
                    <Text>My Products:</Text>
                    <FlatList
                        data={myProducts}
                        renderItem={({item}) => 
                            <List.Item
                                title={item.title}
                                description={item.description}
                                left={props => <List.Icon {...props} icon="attachment" />}
                            />
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            )}
            {!isLogged && (
                <View>
                    <Button icon="edit" mode="contained" onPress={() => navigation.navigate('createProfile')}>Create a new profile</Button>
                </View>
            )}
        </Provider>
    )
}

Screen.navigationOptions = {
    title: 'Profile'
}

export default Screen;