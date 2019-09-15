import React, { useEffect } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, Picker, Image } from 'react-native';
import { useStateValue } from '../../hooks/state';
import * as ImagePicker from 'expo-image-picker';
import { RNS3 } from 'react-native-aws3';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { useQuery } from '@apollo/react-hooks';
import * as queries from '../../apollo/queries';
import { env } from '../../../env.js';
import Style from '../../styles';

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
        if (!result.cancelled) {
          uploadPictureToS3(result.uri);
        }
    };

    takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync()
        if (!result.cancelled) {
          uploadPictureToS3(result.uri);
        }
    }

    uploadPictureToS3 = async (uri) => {
      const randName = Math.round(Math.random() * 1000) + '.png';
      const file = {
        uri: uri,
        name: randName,
        type: "image/png"
      }

      const options = {
        keyPrefix: "images/",
        bucket: "lebonangle-bucket",
        region: "eu-west-3",
        accessKey: env.S3_ACCESS_KEY,
        secretKey: env.S3_SECRET_ACCESS_KEY,
        successActionStatus: 201
      }

      RNS3.put(file, options).then(response => {
        if (response.status !== 201) {
          if (response.status === 307) { // If status code is a redirection status
            return console.log(`>>> Error : Bucket is not ready yet.
    Try to redirect upload request to :
        "${response.headers.Location}" endpoint.
    Current endpoint :
        "https://lebonangle-bucket.s3.amazonaws.com/"`);
          }
          throw new Error("Failed to upload image to S3");
        }

        console.log('Image uploaded successfully !');
        console.log(response.body);
        setState("productImage", response.body.postResponse.location);
      });
    }

    return (
		<View style={Style.main.section}>
            <TextInput
                label='Title'
                value={productTitle}
                onChangeText={productTitle => setState("productTitle", productTitle)}
                style={Style.main.input}
            />
            {
                data != undefined && (
                  <View style={Style.main.postPickerWrapper}>
                    <Picker
                        selectedValue={productCategory}
                        style={Style.main.postPicker}
                        onValueChange={(itemValue, itemIndex) => setState("productCategory", itemValue)}>
                        {
                            data.categories.map((item, index) => {
                                return <Picker.Item key={index} label={item.name} value={item.id} />
                            })
                        }
                    </Picker>
                  </View>
                )
            }
            {
                data == undefined && (
                  <View style={Style.main.postPickerWrapper}>
                    <Picker
                        selectedValue={productCategory}
                        style={Style.main.postPicker}
                        onValueChange={(itemValue, itemIndex) => setState("productCategory", itemValue)}>
                        <Picker.Item label="" value=""/>
                    </Picker>
                  </View>
                )
            }
            <TextInput
                label='Price'
                value={productPrice}
                onChangeText={productPrice => setState("productPrice", productPrice)}
                style={Style.main.input}
            />
            <Button icon="send" style={Style.main.button} mode="contained" onPress={pickImage}>Gallery</Button>
            <Button icon="send" style={Style.main.button} mode="contained" onPress={takePhoto}>Take a new photo</Button>
            {productImage != "" && (
                <Image source={{ uri: productImage }} style={{ width: 200, height: 200 }} />
            )}
        </View>
    );
}

export default productForm;
