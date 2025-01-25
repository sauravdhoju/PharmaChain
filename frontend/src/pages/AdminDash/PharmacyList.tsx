import {
    Box,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Flex,
    IconButton,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Pharmacy } from './AdminDash';
const PharmacyList = ({ pharmacies }: { pharmacies: Pharmacy[] }) => {
    return (
        <Box overflowX='auto'>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Address</Th>
                        <Th>Contact</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {pharmacies.map((pharmacy) => (
                        <Tr key={pharmacy.id}>
                            <Td>{pharmacy.name}</Td>
                            <Td>{pharmacy.address}</Td>
                            <Td>{pharmacy.contact}</Td>
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

export default PharmacyList;
