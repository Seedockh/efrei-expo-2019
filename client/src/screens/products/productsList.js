import React from 'react';
import { Provider, Button, Card, Title, Paragraph  } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { useStateValue } from '../../hooks/state';
import Disconnected from '../../components/disconnected';
import { useQuery } from '@apollo/react-hooks';
import * as queries from '../../apollo/queries';

const Screen = ({ navigation }) => {
    const [{ isLogged }, dispatch] = useStateValue();

    const { data } = useQuery(queries.GET_POSTS);

    return (
        <Provider>
            {isLogged && (
                <Button icon="add" mode="contained" onPress={() => navigation.navigate('createPost')}>Add a new product</Button>
            )}
            {isLogged && data != undefined && (
                <ScrollView>
                {
                    data.posts.map((post, index) => {
                        return (
                            <Card key={index}>
                                <Card.Content>
                                    <Title>{post.title}</Title>
                                    <Paragraph>${post.price}</Paragraph>
                                </Card.Content>
                                <Card.Cover source={{ uri: post.image}} />
                                <Card.Actions>
                                    <Button onPress={() => navigation.navigate('viewProduct', { productId: post.id })}>More...</Button>
                                </Card.Actions>
                            </Card>
                        )
                    })
                }
                </ScrollView>
            )}
            {!isLogged && (
                <Disconnected navigation={navigation}/>
            )}
        </Provider>
    )
}

Screen.navigationOptions = {
    title: 'Products List'
}

export default Screen;