import React from 'react';
import { Provider, Text, Button, List } from 'react-native-paper';
import { View, FlatList } from 'react-native';
import { useStateValue } from '../../hooks/state';

const Screen = ({ navigation }) => {
    const { data } = useQuery(queries.GET_USER, {
		variables: {
			id: navigation.getParam('sellerId')
		}
    });
    
    return (
        <Provider>
            {data != undefined && (
                <View>
                    <Text>Firstname: {firstName}</Text>
                    <Text>Lastname: {lastName}</Text>
                    <Text>Location: {city}</Text>
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
            )}
            
        </Provider>
    )
}

Screen.navigationOptions = {
    title: 'Seller Profile'
}

export default Screen;