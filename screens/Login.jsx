import { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';

import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    Colors,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent
} from './../components/styles.js';

import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper.jsx';
import axios from 'axios';

const {brand, darkLight, primary } = Colors;

const Login = ({navigation}) => {

  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const handleLogin = async (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'http://192.168.29.168:3000/user/signin';
     
        axios
        .post(url,credentials)
        .then((response) => {
            const result = response.data;
            const {message, status, data } = result;
            if(status.toLowerCase() !== 'success'){
                handleMessage(message, status);
            }else{
                console.log('NOT NAVIGATE');
                navigation.navigate("Signup");
                navigation.navigate("Welcome",{...data[0]});
                console.log('NOT NAVIGATE');
            }
            setSubmitting(false);
        })
        .catch(error => {
            console.log(error);
            setSubmitting(false);
            handleMessage("An error occurred, check your internet and try again.");
        })
  }

  const handleMessage = (message, type = 'FAILED') =>{
    setMessage(message);
    setMessageType(type);
  }

  return (
    <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo
                    source={require('./../assets/img/IMG_7182.jpg')}
                    resizeMode="cover"
                />
                <PageTitle>SensorySight</PageTitle>
                <SubTitle>Account Login</SubTitle>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        if (values.email === '' || values.password === ''){
                            handleMessage('Please fill all the details');
                            setSubmitting(false);
                        }else{
                            handleLogin(values, setSubmitting);
                        }
                    } }
                >
                    {({ handleChange, handleBlur,handleSubmit,values, isSubmitting}) => (
                        <StyledFormArea>
                            <MyTextInput
                                label="Email Address"
                                icon="mail"
                                placeholder="example@gmail.com"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                            <MyTextInput
                                label="Password"
                                icon="lock"
                                placeholder="* * * * * * *"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />
                            <MsgBox type={messageType}>{message}</MsgBox>
                            {!isSubmitting && (
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Login</ButtonText>
                                </StyledButton>)}
                            {isSubmitting && (
                                <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </StyledButton>)}
                            <Line />
                            <StyledButton google={true} onPress={handleSubmit}>
                                <Fontisto name="google" color={primary} size={25}/>
                                <ButtonText google={true}>Continue with Google!</ButtonText>
                            </StyledButton>
                            <ExtraView>
                                <ExtraText>Don't have an account already?</ExtraText>
                                <TextLink onPress={() => navigation.navigate("Signup")}>
                                    <TextLinkContent> SignUp</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    </KeyboardAvoidingWrapper>
  )
}

const MyTextInput = ({ label,icon,isPassword,hidePassword,setHidePassword, ...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons 
                    name={icon}
                    size={30}
                    color={brand}
                />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            { isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons 
                        name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                        size={30}
                        color={darkLight}    
                    />
                </RightIcon>
            )}
        </View>
    )
}

export default Login;