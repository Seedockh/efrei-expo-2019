import React, { useEffect } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, Picker, Image } from 'react-native';
import { useStateValue } from '../../hooks/state';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { useQuery } from '@apollo/react-hooks';
import * as queries from '../../apollo/queries';

const productForm = (post) => {
    const [{ productTitle, productCategory, productPrice, productImage, onEditProduct }, dispatch] = useStateValue();

    const setState = (state, value) => {
        return dispatch({
            type: 'setState',
            state,
            value
        })
    }
    
    useEffect(() => {
		if (post.post != undefined && productTitle == "" && productImage == "" && onEditProduct) {
            setState("productTitle", post.post.title)
            setState("productCategory", post.post.category.id)
            setState("productPrice", post.post.price.toString())
            setState("productImage", post.post.image)
        }
    })
    
    const { data } = useQuery(queries.GET_CATEGORIES);    

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
            {
                data != undefined && (
                    <Picker
                        selectedValue={productCategory}
                        style={{height: 50, width: 'auto'}}
                        onValueChange={(itemValue, itemIndex) => setState("productCategory", itemValue)}>
                        {
                            data.categories.map((item, index) => {
                                return <Picker.Item key={index} label={item.name} value={item.id} />
                            })
                        }
                    </Picker>
                )
            }
            {
                data == undefined && (
                    <Picker
                        selectedValue={productCategory}
                        style={{height: 50, width: 'auto'}}
                        onValueChange={(itemValue, itemIndex) => setState("productCategory", itemValue)}>
                        <Picker.Item label="" value=""/>
                    </Picker>
                )
            }
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