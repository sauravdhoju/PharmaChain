import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {
    Box,
    Heading,
    Text,
    Link as ChakraLink,
    Button,
} from '@chakra-ui/react';

import { useBackendAPIContext } from '../../contexts/BackendAPIContext/BackendAPIContext';

import Icon from '../../components/Icon/Icon';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import FormBorder from '../../components/FormBorder/FormBorder';

import './Register.scss';

const Register = () => {
    const navigate = useNavigate();
    const { client } = useBackendAPIContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        setIsLoading(true);
        const pharmacyDetails = {
            name,
            email,
            password,
            phone_no: phone,
        };
        client
            .post('/auth/register', pharmacyDetails)
            .then((res) => {
                console.log(res.data);
                setIsLoading(false);
                navigate('/login');
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleRegister();
    };
    return (
        <Box className='register-page'>
            {/* <NavBar /> */}
            <Box className='register-stuff-container'>
                <Heading className='greeting'>Create Account</Heading>
                <Text className='register-info-text'>
                    Create your new account!
                </Text>
                <form className='register-form' onSubmit={handleSubmit}>
                    <CustomTextInput
                        label='Full Name'
                        type='name'
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setName(e.target.value);
                        }}
                        placeholder='Full Name'
                        className='custom-input custom-input-username'
                    />
                    <CustomTextInput
                        label='Email'
                        type='email'
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(e.target.value);
                        }}
                        placeholder='example@email.com'
                        className='custom-input custom-input-email'
                        required
                    />
                    <CustomTextInput
                        label='Password'
                        type='password'
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value);
                        }}
                        className='custom-input custom-input-password'
                        placeholder='********'
                        required
                    />
                    <CustomTextInput
                        label='Phone Number'
                        type='phone'
                        value={phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPhone(e.target.value);
                        }}
                        placeholder='9800000000'
                        className='custom-input custom-input-phone'
                        required
                    />
                    <ChakraLink
                        as={ReactRouterLink}
                        to='/'
                        className='forgot-password-link'
                    >
                        Forgot Password?
                    </ChakraLink>
                    <Button
                        type='submit'
                        className='form-submit-btn'
                        background={'#000000'}
                        color={'#d9d9d9'}
                        borderRadius={'8px'}
                        marginTop={'15px'}
                        height={'50px'}
                        fontSize={'22px'}
                        fontWeight={600}
                        isLoading={isLoading}
                    >
                        Sign Up
                    </Button>
                </form>
                <FormBorder />
                <ChakraLink
                    as={ReactRouterLink}
                    to={'/login'}
                    className='login-page-link'
                    textAlign={'center'}
                    marginTop={'28px'}
                >
                    Have an account?{' '}
                    <Text as={'span'} fontWeight={700}>
                        Sign In!
                    </Text>
                </ChakraLink>
                <ChakraLink
                    as={ReactRouterLink}
                    to={'/'}
                    className='back-home-link'
                >
                    <Icon name='bx-arrow-back' className='arrow' />
                    Back to Home
                </ChakraLink>
            </Box>
        </Box>
    );
};

export default Register;
