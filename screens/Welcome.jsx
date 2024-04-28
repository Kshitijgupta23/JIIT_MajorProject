import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';

import {
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar
} from './../components/styles.js';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';

const Welcome = ({navigation, route}) => {

    const { name, email } = route.params;
    const [galleryPhoto, setGalleryPhoto] = useState();
    const [cameraPhoto, setcameraPhoto] = useState();

    console.log(galleryPhoto);
    console.log(cameraPhoto);

    let options = {
        saveToPhotos: true,
        mediaType: 'photo',
    };

    const openCamera = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
            const result = await launchCamera(options);
            setcameraPhoto(result.assets[0].uri);
        }
    };

    const openGallery = async () =>{
        const result = await launchImageLibrary(options);
        setGalleryPhoto(result.assets[0].uri);
    }

  return (
    <>
        <StatusBar style="light" />
        <InnerContainer>
            <WelcomeContainer>
                <PageTitle welcome={true}>Welcome! Buddy</PageTitle>
                <SubTitle welcome={true}>{name || 'Kshitij Gupta'}</SubTitle>
                <SubTitle welcome={true}>{email || 'kshitij@gmail.com'}</SubTitle>
                <StyledFormArea>
                    <Avatar
                        source={require('./../assets/img/IMG_7182.jpg')}
                        resizeMode="cover"
                    />        
                    <Line />
                    <StyledButton onPress={openCamera}>
                        <ButtonText>Open Camera</ButtonText>
                    </StyledButton>
                    <StyledButton onPress={openGallery}>
                        <ButtonText>Open Gallery</ButtonText>
                    </StyledButton>
                    <StyledButton logout={true} onPress={() => {navigation.navigate("Login")}}>
                        <ButtonText logout={true}>Logout</ButtonText>
                    </StyledButton>
                </StyledFormArea>
            </WelcomeContainer>
        </InnerContainer>
    </>
  )
}

export default Welcome;