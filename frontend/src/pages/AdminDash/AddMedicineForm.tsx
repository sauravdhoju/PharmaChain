import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { useBackendAPIContext } from '../../contexts/BackendAPIContext/BackendAPIContext';

type AddMedicineForm = {
    fetchMedicines: () => {};
};

const AddMedicineForm = ({ fetchMedicines }: AddMedicineForm) => {
    const { client } = useBackendAPIContext();
    const toast = useToast();
    const [medicineName, setMedicineName] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [dosageForm, setDosageForm] = useState<number | ''>('');
    // const [category]
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await client.post('/medicine/add/', {
                name: medicineName,
                manufacturer,
                dosage_form: dosageForm,
            });
            const data = await response.data;
            if (data) {
                fetchMedicines();
                toast({
                    title: 'Medicine added.',
                    status: 'success',
                    duration: 3000,
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box className='dashboard__form' p={6}>
            <form onSubmit={handleSubmit}>
                <FormControl mb={4}>
                    <FormLabel>Medicine Name</FormLabel>
                    <Input
                        placeholder='Enter medicine name'
                        _focus={{
                            borderColor: 'blue.400',
                            boxShadow: '0 0 0 1px blue.400',
                        }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setMedicineName(e.target.value)
                        }
                        value={medicineName}
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Manufacturer</FormLabel>
                    <Input
                        placeholder='Enter manufacturer name'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setManufacturer(e.target.value)
                        }
                        value={manufacturer}
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Dosage Form</FormLabel>
                    <Input
                        placeholder='Dosage in mg'
                        type='number'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setDosageForm(
                                e.target.value === ''
                                    ? ''
                                    : parseFloat(e.target.value)
                            )
                        }
                        value={dosageForm}
                    />
                </FormControl>
                <Button
                    type='submit'
                    colorScheme='blue'
                    width={{ base: 'full', md: 'auto' }}
                    leftIcon={<AddIcon />}
                >
                    Add Medicine
                </Button>
            </form>
        </Box>
    );
};

export default AddMedicineForm;
