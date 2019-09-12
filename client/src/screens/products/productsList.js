import React from 'react';
import { Provider, Button, Card, Title, Paragraph  } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { useStateValue } from '../../hooks/state';
import Disconnected from '../../components/disconnected';
import { useQuery } from '@apollo/react-hooks';
import * as queries from '../../apollo/queries';
import Style from '../../styles'

const Screen = ({ navigation }) => {
    const [{ isLogged }, dispatch] = useStateValue();

    const { data } = useQuery(queries.GET_POSTS);

    return (
        <Provider>
          <View style={Style.main.container}>
            {isLogged && data != undefined && (
                <ScrollView style={Style.main.productsList}>
                {
                    data.posts.map((post, index) => {
                        return (
                            <Card key={index} style={Style.main.card}>
                                <Card.Content style={Style.main.cardHeader}>
                                    <Title style={Style.main.cardTitle}>{post.title}</Title>
                                    <Paragraph style={Style.main.cardText}>${post.price}</Paragraph>
                                </Card.Content>
                                <Card.Cover style={Style.main.cardCover} source={{ uri: post.image}} />
                                <Card.Actions>
                                    <Button style={Style.main.cardButton} onPress={() => navigation.navigate('viewProduct', { productId: post.id })}  dark={true}>See details</Button>
                                </Card.Actions>
                            </Card>
                        )
                    })
                }
                </ScrollView>
            )}
            {isLogged && (
                <Button mode="contained" onPress={() => navigation.navigate('createPost')} style={Style.main.roundButton}>New</Button>
            )}
            {!isLogged && (
                <Disconnected navigation={navigation}/>
            )}
          </View>
        </Provider>
    )
}

export default Screen;
