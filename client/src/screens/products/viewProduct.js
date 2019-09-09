import React from 'react';
import { Provider  } from 'react-native-paper';
import { Text, Image } from 'react-native';

const Screen = ({ navigation }) => {
    return (
        <Provider>
            <Text>Product n°1</Text>
            <Text>Buy a nice forest :D</Text>
            <Text>$10.000</Text>
            <Text>Photo 1:</Text>
            <Image
                style={{height: 200}}
                source={{ uri: 'https://picsum.photos/700' }}
            />
            <Text>Photo 2:</Text>
            <Image
                style={{height: 200}}
                source={{ uri: 'https://picsum.photos/701' }}
            />
        </Provider>
    )
}

Screen.navigationOptions = {
    title: 'View Product'
}

export default Screen;