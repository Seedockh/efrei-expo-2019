import React, { useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import { AppState, View, Image, TouchableOpacity, Alert } from 'react-native';
import { useStateValue } from '../../hooks/state';
import * as ImagePicker from 'expo-image-picker';
import { RNS3 } from 'react-native-aws3';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { env } from '../../../env.js';
import Style from '../../styles'

const profileForm = () => {
    const [{ firstName, lastName, city, image }, dispatch] = useStateValue();
    let tempData = { tempFirstName: firstName, tempLastName: lastName, tempCity: city };

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
        "${response.headers.Location}" endpoint.`);
          }
          throw new Error("Failed to upload image to S3");
        }

        console.log('Image uploaded successfully !');
        setState('image', response.body.postResponse.location);
      });
    }

    const clickPicture = () => {
      Alert.alert(
        'Edit your picture',
        'Chose a way to edit your profile picture',
        [
          { text: 'Gallery', onPress: pickImage },
          { text: 'New', onPress: takePhoto }
        ],
        { cancelable: false },
      );
    }

    return (
    <>
      <TouchableOpacity onPress={clickPicture}>
        <View style={Style.main.rowSection}>
          <Image source={{ uri: image }} style={Style.main.profilePic}/>
        </View>
      </TouchableOpacity>
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
    </>
    );
}

export default profileForm;
