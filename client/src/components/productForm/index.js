import React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, Picker, Image } from 'react-native';
import { useStateValue } from '../../hooks/state';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const productForm = () => {
    const [{ productTitle, productCategory, productPrice, productImage }, dispatch] = useStateValue();
    
    const setState = (state, value) => {
        return dispatch({
            type: 'setState',
            state,
            value
        })
    }
    
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { CRStatus } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (CRStatus !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
            const { CStatus } = await Permissions.askAsync(Permissions.CAMERA);
            if (CStatus !== 'granted') {
                alert('Sorry, we need camera permissions to make this work!');
            }
        }
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            setState("productImage", result.uri)
        }
    };

    takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync()

        console.log(result)

        if (!result.cancelled) {
            setState("productImage", result.uri)
        }
    }

    return (
		<View>
            <TextInput
                label='Title'
                value={productTitle}
                onChangeText={productTitle => setState("productTitle", productTitle)}
                mode='outlined'
            />
            <Picker
                selectedValue={productCategory}
                style={{height: 50, width: 'auto'}}
                onValueChange={(itemValue, itemIndex) => setState("productCategory", productCategory)}>
                <Picker.Item label="Home" value="home" />
                <Picker.Item label="Electronic" value="elec" />
                <Picker.Item label="Vehicle" value="vehicle" />
                <Picker.Item label="Food" value="food" />
                <Picker.Item label="Sport" value="sport" />
            </Picker>
            <TextInput
                label='Price'
                value={productPrice}
                onChangeText={productPrice => setState("productPrice", productPrice)}
                mode='outlined'
            />
            <Button icon="send" mode="contained" onPress={pickImage}>Pick an image from camera roll</Button>
            <Button icon="send" mode="contained" onPress={takePhoto}>Take a new photo</Button>
            {productImage != "" && (
                <Image source={{ uri: productImage }} style={{ width: 200, height: 200 }} />
            )}
        </View>
    );
}

export default productForm;