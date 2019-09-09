import React from 'react';
import { Provider, Text, Button, List } from 'react-native-paper';
import { View, FlatList } from 'react-native';
import { useStateValue } from '../../hooks/state';

const Screen = ({ navigation }) => {
    const [{ isLogged, firstName, lastName, city, products }, dispatch] = useStateValue();

    return (
        <Provider>
            <View>
                <Text>{firstName}</Text>
                <Text>{lastName}</Text>
                <Text>{city}</Text>
                <Text>Products:</Text>
                <FlatList
                    data={products}
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
            
        </Provider>
    )
}

Screen.navigationOptions = {
    title: 'Seller Profile'
}

export default Screen;