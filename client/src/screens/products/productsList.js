import React from 'react';
import { Provider, Button, Card, Title, Paragraph  } from 'react-native-paper';
import { useStateValue } from '../../hooks/state';
import Disconnected from '../../components/disconnected';

const Screen = ({ navigation }) => {
    const [{ isLogged }, dispatch] = useStateValue();

    return (
        <Provider>
            {isLogged && (
                <>
                <Button icon="add" mode="contained" onPress={() => navigation.navigate('createPost')}>Add a new product</Button>
                <Card>
                    <Card.Content>
                        <Title>Product n°1</Title>
                        <Paragraph>Buy a nice forest :D</Paragraph>
                    </Card.Content>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Actions>
                        <Button onPress={() => navigation.navigate('viewProduct')}>More...</Button>
                    </Card.Actions>
                </Card>
                </>
            )}
            {!isLogged && (
                <Disconnected/>
            )}
        </Provider>
    )
}

Screen.navigationOptions = {
    title: 'Products List'
}

export default Screen;