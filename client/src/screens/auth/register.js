import React, { useState } from 'react';
import { View, ScrollView, Alert, Picker, Image } from 'react-native';
import { Provider, Button, TextInput, Text, ProgressBar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { RNS3 } from 'react-native-aws3';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { env } from '../../../env.js';
import { useStateValue } from '../../hooks/state';
import * as mutations from '../../apollo/mutations';
import { useMutation } from '@apollo/react-hooks';
import Style from '../../styles';

const Screen = ({ navigation }) => {
    const [{ isLogged, firstName, lastName, city, id }, dispatch] = useStateValue();
    const [currentFirstName, setCurrentFirstName] = useState();
    const [currentLastName, setCurrentLastName] = useState();
    const [currentCity, setCurrentCity] = useState();
    const [currentImage, setCurrentImage] = useState();
    const [getRegister, { loading, error, data }] = useMutation(mutations.CREATE_USER)

    const setState = (state, value) => {
        return dispatch({
            type: 'setState',
            state,
            value
        })
    }

    if (data && data.createUser && !isLogged) {
      dispatch({
          type: 'setState',
          state: 'id',
          value: data.createUser.id
      });
      dispatch({
          type: 'setState',
          state: 'firstName',
          value: data.createUser.firstname
      });
      dispatch({
          type: 'setState',
          state: 'lastName',
          value: data.createUser.lastname
      });
      dispatch({
          type: 'setState',
          state: 'city',
          value: data.createUser.city
      });
      dispatch({
          type: 'setState',
          state: 'image',
          value: data.createUser.image
      });
      dispatch({
          type: 'setState',
          state: 'isLogged',
          value: true
      });
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

      RNS3.put(file, options).then( async response => {
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
        await setCurrentImage(response.body.postResponse.location);
        console.log(currentImage);
      });
    }

    const register = () => {
      if (!currentImage) {
        dispatch({
            type: 'setState',
            state: 'image',
            value: 'https://lebonangle-bucket.s3.eu-west-3.amazonaws.com/images/icon.png'
        });
      }

      if (!currentFirstName || !currentLastName || !currentCity || currentFirstName.length<3 || currentLastName.length<3 || currentCity.length<3 ) {
        return Alert.alert(
          'Whoops !',
          'All fields are required and must be at least 3 characters long !',
          [
            { text: 'Try again' }
          ],
          { cancelable: false },
        );
      }

      getRegister({
        variables: {
          data: {
            firstname: currentFirstName,
            lastname: currentLastName,
            city: currentCity,
            image: currentImage,
          }
        }
      })
      navigation.navigate('tabNavigator');
    }

    const goToLogin = () => {
      navigation.navigate('login');
    }

    return (
      <Provider>
          <ScrollView>
            <View style={Style.main.container}>
              <Text style={Style.main.bigTitle}>Register</Text>
              {loading &&
                <ProgressBar progress={0.5} color='white' />
              }
              {!loading &&
                <>
                  <View style={Style.main.section}>
                    <TextInput
                        style={Style.main.input}
                        label='First Name'
                        value={currentFirstName}
                        underlineColor='transparent'
                        onChangeText={text => setCurrentFirstName(text)}
                    />
                    <TextInput
                        style={Style.main.input}
                        label='Last Name'
                        value={currentLastName}
                        underlineColor='transparent'
                        onChangeText={text => setCurrentLastName(text)}
                    />
                    <TextInput
                        style={Style.main.input}
                        label='City'
                        value={currentCity}
                        underlineColor='transparent'
                        onChangeText={text => setCurrentCity(text)}
                    />
                    <Button icon="send" style={Style.main.button} mode="contained" onPress={pickImage}>Gallery</Button>
                    <Button icon="send" style={Style.main.button} mode="contained" onPress={takePhoto}>Take a new photo</Button>
                    {currentImage != "" && (
                        <Image source={{ uri: currentImage }} style={{ width: 200, height: 200 }} />
                    )}
                  </View>
                  <View style={Style.main.section}>
                    <Button style={Style.main.button} icon="send" mode="contained" onPress={register}>Create</Button>
                    <Button style={Style.main.button} icon="cancel" mode="contained" onPress={goToLogin}>Back</Button>
                  </View>
                </>
              }
            </View>
          </ScrollView>
      </Provider>
    )
}

export default Screen;
