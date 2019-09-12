import React from 'react';
import { TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { useStateValue } from '../../hooks/state';
import Style from '../../styles'

const profileForm = () => {
    const [{ firstName, lastName, city }, dispatch] = useStateValue();

    const setState = (state, value) => {
        return dispatch({
            type: 'setState',
            state,
            value
        })
    }

    return (
  		<View style={Style.main.container}>
        <TextInput
            label='First Name'
            value={firstName}
            onChangeText={firstName => setState("firstName", firstName)}
            mode='outlined'
        />
        <TextInput
            label='Last Name'
            value={lastName}
            onChangeText={value => setState("lastName", value)}
            mode='outlined'
        />
        <TextInput
            label='City'
            value={city}
            onChangeText={value => setState("city", value)}
            mode='outlined'
        />
      </View>
    );
}

export default profileForm;
