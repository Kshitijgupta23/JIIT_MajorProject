import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';

import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

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

const {brand, darkLight, primary } = Colors;

const Signup = ({navigation}) => {

  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000,0,1));
  const [dob,setDob] = useState();

  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
  }

  const showDatePicker = () => {
    setShow(true);
  }

  const handleSignup = async (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'http://192.168.29.168:3000/user/signup';
     
        axios
        .post(url,credentials)
        .then((response) => {
            const result = response.data;
            const {message, status, data } = result;
            if(status.toLowerCase() !== 'success'){
                handleMessage(message, status);
            }else{
                navigation.navigate("Welcome",{...data});
            }
            setSubmitting(false);
        })
        .catch(error => {
            console.log(error);
            setSubmitting(false);
            handleMessage("An error occurred, check your internet and try again.");
        })
  }

  const handleMessage = (message, type = 'Failed') =>{
    setMessage(message);
    setMessageType(type);
  }

  return (
    <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageTitle>SensorySight</PageTitle>
                <SubTitle>Account SignUp</SubTitle>

                {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    display='default'
                    onChange={onChange}
                />
                )}

                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        dateOfBirth: '',
                        confirmPassword: ''
                    }}
                    onSubmit={(values, { setSubmitting }) => {  
                        // values = {...values,dateOfBirth: dob}
                        if (
                            values.email === '' ||
                            values.password === '' ||
                            values.name === '' ||
                            values.password === ''
                        ){
                            handleMessage('Please fill all the details');
                            setSubmitting(false);
                        }else if(values.password !== values.confirmPassword){
                            handleMessage('Passwords do not match');
                            setSubmitting(false);
                        }else{
                            handleSignup(values, setSubmitting);
                        }
                    }}
                >
                    {({ handleChange, handleBlur,handleSubmit,values, isSubmitting}) => (
                        <StyledFormArea>
                            <MyTextInput
                                label="Full Name"
                                icon="person"
                                placeholder="John Doe"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
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
                                label="Date of Birth"
                                icon="calendar"
                                placeholder="YYYY - MM - DD"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('dateOfBirth')}
                                onBlur={handleBlur('dateOfBirth')}
                                value={dob ? dob.toDateString() : ''}
                                isDate={true}
                                editable={false}
                                showDatePicker={showDatePicker}
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
                            <MyTextInput
                                label=" Confirm Password"
                                icon="lock"
                                placeholder="* * * * * * *"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />
                            <MsgBox type={messageType}>{message}</MsgBox>
                            {!isSubmitting && (
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Sign Up</ButtonText>
                                </StyledButton>)}
                            {isSubmitting && (
                                <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </StyledButton>)}
                            <Line />
                            <ExtraView>
                                <ExtraText>Already have an account?</ExtraText>
                                <TextLink onPress={() => navigation.navigate("Login")}>
                                    <TextLinkContent> Login</TextLinkContent>
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

const MyTextInput = ({ label,icon,isPassword,hidePassword,setHidePassword,isDate,showDatePicker, ...props}) => {
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
            { !isDate && <StyledTextInput {...props} />}
            { isDate && (
                <TouchableOpacity onPress={showDatePicker}>
                    <StyledTextInput {...props} />
                </TouchableOpacity>
            )}
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

export default Signup;