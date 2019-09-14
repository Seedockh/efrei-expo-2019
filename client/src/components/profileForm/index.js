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
  		<View style={Style.main.section}>
        <TextInput
            label='First Name'
            style={Style.main.input}
            value={firstName}
            onChangeText={firstName => setState("firstName", firstName)}
        />
        <TextInput
            label='Last Name'
            style={Style.main.input}
            value={lastName}
            onChangeText={value => setState("lastName", value)}
        />
        <TextInput
            label='City'
            style={Style.main.input}
            value={city}
            onChangeText={value => setState("city", value)}
        />
      </View>
    );
}

export default profileForm;
