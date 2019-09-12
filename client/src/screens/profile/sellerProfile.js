import React from 'react';
import { Provider, Text, Button, List } from 'react-native-paper';
import { View, FlatList } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import * as queries from '../../apollo/queries';

const Screen = ({ navigation }) => {
    const { data } = useQuery(queries.GET_USER, {
		variables: {
			id: 1
        },
        fetchPolicy: "no-cache"
    });

    return (
        <Provider>
            {data != undefined && (
                <View>
                    <Text>Firstname: {data.user.firstname}</Text>
                    <Text>Lastname: {data.user.lastname}</Text>
                    <Text>Location: {data.user.city}</Text>
                    <Text>Products:</Text>
                    <FlatList
                        data={data.user.posts}
                        renderItem={({item}) =>
                            <List.Item
                                title={item.title}
                                description={`$ ${item.price.toString()}`}
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

export default Screen;
