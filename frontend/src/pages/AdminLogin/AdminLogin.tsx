import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    Text,
    useToast,
    InputGroup,
    InputRightElement,
    IconButton,
} from '@chakra-ui/react';
import { useBackendAPIContext } from '../../contexts/BackendAPIContext/BackendAPIContext';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.scss';

const AdminLogin: React.FC = () => {
    const { client } = useBackendAPIContext();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await client.post('/admin/login', {
                email,
                password,
            });
            const data = response.data.currentAdmin;
            console.log(data);
            if (data) {
                toast({
                    title: 'Login successful!',
                    status: 'success',
                    duration: 3000,
                });

                setIsLoading(false);
                navigate('/admin_dash');
            }
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    return (
        <Box
            minH='100vh'
            display='flex'
            alignItems='center'
            justifyContent='center'
            //   bgGradient="linear(to-r, blue.200, purple.200)"
            background='whiteAlpha.100'
            p={4}
        >
            <Box
                className='login__card'
                p={8}
                borderRadius='2xl'
                w={{ base: '90%', md: '400px' }}
            >
                <VStack spacing={6}>
                    <Box textAlign='center' mb={4}>
                        <Heading size='lg' color='blue.600' mb={2}>
                            Welcome Back! 👋
                        </Heading>
                        <Text color='gray.600'>
                            Enter your credentials to access the admin panel
                        </Text>
                    </Box>

                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <VStack spacing={4} w='100%'>
                            <FormControl>
                                <FormLabel color='gray.600'>Email</FormLabel>
                                <Input
                                    className='login__input'
                                    type='email'
                                    placeholder='admin@example.com'
                                    size='lg'
                                    borderRadius='lg'
                                    bg='white'
                                    value={email}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setEmail(e.target.value)}
                                    required
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel color='gray.600'>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        className='login__input'
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder='Enter your password'
                                        size='lg'
                                        borderRadius='lg'
                                        bg='white'
                                        value={password}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => setPassword(e.target.value)}
                                        required
                                    />
                                    <InputRightElement h='full'>
                                        <IconButton
                                            aria-label={
                                                showPassword
                                                    ? 'Hide password'
                                                    : 'Show password'
                                            }
                                            icon={
                                                showPassword ? (
                                                    <ViewOffIcon />
                                                ) : (
                                                    <ViewIcon />
                                                )
                                            }
                                            variant='ghost'
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        />
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                            <Button
                                className='login__button'
                                type='submit'
                                colorScheme='blue'
                                size='lg'
                                w='100%'
                                borderRadius='lg'
                                isLoading={isLoading}
                                loadingText='Logging in...'
                                bgGradient='linear(to-r, blue.400, blue.500)'
                                _hover={{
                                    bgGradient:
                                        'linear(to-r, blue.500, blue.600)',
                                }}
                                _active={{
                                    bgGradient:
                                        'linear(to-r, blue.600, blue.700)',
                                }}
                            >
                                Login
                            </Button>
                        </VStack>
                    </form>
                </VStack>
            </Box>
        </Box>
    );
};

export default AdminLogin;
