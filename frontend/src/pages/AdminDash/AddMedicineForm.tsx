import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const AddMedicineForm: React.FC = () => {
    const toast = useToast();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: 'Medicine added.',
            status: 'success',
            duration: 3000,
        });
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
                    />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Manufacturer</FormLabel>
                    <Input placeholder='Enter manufacturer name' />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Dosage Form</FormLabel>
                    <Input placeholder='Dosage in mg' />
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
