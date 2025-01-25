import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import {
    Box,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    Flex,
    IconButton,
} from '@chakra-ui/react';
import { Medicine } from './AdminDash';
const MedicineList = ({ medicines }: { medicines: Medicine[] }) => {
    return (
        <Box overflowX='auto'>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Manufacturer</Th>
                        <Th>Dosage Form</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {medicines.map((medicine) => (
                        <Tr key={medicine.id}>
                            <Td>{medicine.name}</Td>
                            <Td>{medicine.manufacturer}</Td>
                            <Td>{medicine.dosage_form}</Td>
                            <Td>
                                <Flex gap={2}>
                                    <IconButton
                                        aria-label='Edit'
                                        icon={<EditIcon />}
                                        size='sm'
                                        colorScheme='blue'
                                        variant='ghost'
                                    />
                                    <IconButton
                                        aria-label='Delete'
                                        icon={<DeleteIcon />}
                                        size='sm'
                                        colorScheme='red'
                                        variant='ghost'
                                    />
                                </Flex>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default MedicineList;
