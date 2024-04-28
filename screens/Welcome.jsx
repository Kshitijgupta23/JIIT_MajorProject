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
import * as ImagePicker from "expo-image-picker";

const Welcome = ({navigation, route}) => {

    const { name, email } = route.params;
    const [photo, setPhoto] = useState();

    const uploadImage = async (mode) =>{
        try{
            let result={}
            if(mode === "gallery"){
                await ImagePicker.requestCameraPermissionsAsync();
                result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1,1],
                quality: 1,
            });
            }else{
                await ImagePicker.requestCameraPermissionsAsync(); 
                result = await ImagePicker.launchCameraAsync({
                cameraType: ImagePicker.CameraType.back,
                allowsEditing: true,
                aspect: [1,1],
                quality: 1
            });
            }

            if(!result.canceled){
                await saveImage(result.assets[0].uri);
            }
        }catch(error){
            console.log(error);
        }
    }

    const saveImage = async (image) =>{
        try{
            setPhoto(image);
        }catch(error){
            console.log(error);
        }
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
                    <StyledButton onPress={() => uploadImage()}>
                        <ButtonText>Open Camera</ButtonText>
                    </StyledButton>
                    <StyledButton onPress={() => uploadImage("gallery")}>
                        <ButtonText>Open Gallery</ButtonText>
                    </StyledButton>
                    <StyledButton logout={true} onPress={() => {navigation.navigate("Login")}}>
                        <ButtonText logout={true}>Logout</ButtonText>
                    </StyledButton>
                </StyledFormArea>
                <Avatar
                        uri={{photo}}
                        resizeMode="cover"
                    /> 
            </WelcomeContainer>
        </InnerContainer>
    </>
  )
}

export default Welcome;