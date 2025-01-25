import {
    Box, FormControl, FormLabel, Input, Button, useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';

const AddPharmacyForm: React.FC = () => {
    const toast = useToast();
    const [pharmacyName, setPharmacyName] = useState('');
    const [pharmacyAddress, setPharmacyAddress] = useState('');
    const [pharmacyContact, setPharmacyContact] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: 'Pharmacy added.',
            status: 'success',
            duration: 3000,
        });
    };

    return (
            <Box className='dashboard__form' p={6}>
                <form onSubmit={handleSubmit}>
                    <FormControl mb={4}>
                        <FormLabel>Pharmacy Name</FormLabel>
                        <Input
                            placeholder='Enter pharmacy name'
                            _focus={{
                                borderColor: 'blue.400',
                                boxShadow: '0 0 0 1px blue.400',
                            }}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setPharmacyName(e.target.value)}
                            value={pharmacyName}
                        />
                    </FormControl>
                    
                    <FormControl mb={4}>
                        <FormLabel>Address</FormLabel>
                        <Input 
                            placeholder='Enter Address' 
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setPharmacyAddress(e.target.value)}
                            value={pharmacyAddress}/>
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Contact</FormLabel>
                        <Input placeholder='Contact'
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setPharmacyContact(e.target.value)}
                            value={pharmacyContact}/>
                    </FormControl>

                    <Button
                        type='submit'
                        colorScheme='blue'
                        width={{ base: 'full', md: 'auto' }}
                        leftIcon={<AddIcon />}
                    >
                        Add Pharmacy
                    </Button>
                </form>
            </Box>
        );
    };
    
    export default AddPharmacyForm;
    