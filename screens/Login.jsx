import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';

import { Octicons } from '@expo/vector-icons';

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
    Colors
} from './../components/styles.js';

const {brand, darkLight} = Colors;


const Login = () => {
  return (
    <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
            <PageLogo
                source={require('./../assets/img/IMG_7182.jpg')}
                resizeMode="cover"
            />
            <PageTitle>MAJOR PROJECT</PageTitle>
            <SubTitle>Account Login</SubTitle>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={(values) => console.log(values)}
            >
                {({ handleChange, handleBlur,handleSubmit,values}) => (
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
                            secureTextEntry={true}
                        />
                    </StyledFormArea>
                )}
            </Formik>
        </InnerContainer>
    </StyledContainer>
  )
}

const MyTextInput = ({ label,icon,...props}) => {
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
        </View>
    )
}

export default Login;