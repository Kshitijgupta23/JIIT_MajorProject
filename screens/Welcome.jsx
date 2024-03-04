import { StatusBar } from 'expo-status-bar';

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

const Welcome = () => {

  return (
    <>
        <StatusBar style="light" />
        <InnerContainer>
            <WelcomeImage
                source={require('./../assets/img/IMG_7182.jpg')}
                resizeMode="cover"
            />
            <WelcomeContainer>
                <PageTitle welcome={true}>Welcome! Buddy!</PageTitle>
                <SubTitle welcome={true}>Kshitij Gupta</SubTitle>
                <SubTitle welcome={true}>kshitij@gmail.com</SubTitle>
                <StyledFormArea>
                    <Avatar
                        source={require('./../assets/img/IMG_7182.jpg')}
                        resizeMode="cover"
                    />        
                    <Line />
                    <StyledButton onPress={() => {}}>
                        <ButtonText>Logout</ButtonText>
                    </StyledButton>
                </StyledFormArea>
            </WelcomeContainer>
        </InnerContainer>
    </>
  )
}

export default Welcome;