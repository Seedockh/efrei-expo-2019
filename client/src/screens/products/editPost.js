import React from 'react';
import { Provider } from 'react-native-paper';
import { View, Text } from 'react-native'

export default function ViewAccount() {
    return (
        <Provider>
            <View>
                <Text>Edit Post</Text>
            </View>
        </Provider>
    )
}