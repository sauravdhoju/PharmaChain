// AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Input,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@chakra-ui/react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
// import Icon from '../../components/Icon/Icon';
import './AdminDash.scss';
import { useBackendAPIContext } from '../../contexts/BackendAPIContext/BackendAPIContext';
import AddMedicineForm from './AddMedicineForm';
import MedicineList from './MedicineList';
import PharmacyList from './PharmacyList';
// import AddPharmacyForm from './AddPharmacyForm';

export interface Medicine {
    id: number;
    name: string;
    manufacturer: string;
    dosage_form: number;
}

export interface Pharmacy {
    id: number;
    name: string;
    address: string;
    phone_no: number;
}

const AdminDash: React.FC = () => {
    const { client } = useBackendAPIContext();
    const [activeTab, setActiveTab] = useState<'medicines' | 'pharmacies'>(
        'medicines'
    );
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);

    const fetchMedicines = async () => {
        try {
            const response = await client.get('/medicines');
            const data = await response.data.medicines;
            if (data) setMedicines(data);
            else throw new Error('No data found!');
        } catch (error) {
            console.error(error);
        }
    };
    const fetchPharmacies = async () => {
        try {
            const response = await client.get('/pharmacys');
            console.log(response);
            const data = await response.data.pharmacys;
            if (data) setPharmacies(data);
            else throw new Error('No data found');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMedicines();
        fetchPharmacies();
    }, []);

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box minH='100vh' bg='gray.50'>
            <Box className='dashboard__header'>
                <Container maxW='7xl'>
                    <Flex gap={8} py={4}>
                        {(['medicines', 'pharmacies'] as const).map((tab) => (
                            <Button
                                key={tab}
                                variant='ghost'
                                className={`dashboard__tab ${
                                    activeTab === tab
                                        ? 'dashboard__tab--active'
                                        : ''
                                }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </Button>
                        ))}
                    </Flex>
                </Container>
            </Box>

            <Container maxW='7xl' py={8}>
                <Flex justify='space-between' align='center' mb={6}>
                    <Heading size='lg'>
                        {activeTab === 'medicines'
                            ? 'Medicines Management'
                            : 'Pharmacies Management'}
                    </Heading>
                    {activeTab === 'medicines' && (
                        <Button
                            leftIcon={<AddIcon />}
                            colorScheme='blue'
                            onClick={onOpen}
                        >
                            Add Medicine
                        </Button>
                    )}
                </Flex>

                <Box mb={6} position='relative'>
                    <Input
                        placeholder={`Search ${activeTab}...`}
                        bg='white'
                        pl={10}
                    />
                    <SearchIcon
                        position='absolute'
                        left={3}
                        top='50%'
                        transform='translateY(-50%)'
                        color='gray.400'
                    />
                </Box>

                {activeTab === 'medicines' ? (
                    <>
                        {/* <AddMedicineForm /> */}
                        <Box mt={6}>
                            <MedicineList medicines={medicines} />
                        </Box>
                    </>
                ) : (
                    <Box mt={6}>
                        <PharmacyList pharmacies={pharmacies} />
                    </Box>
                )}

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            Add{' '}
                            {activeTab === 'medicines'
                                ? 'Medicine'
                                : 'Pharmacy'}
                        </ModalHeader>
                        <ModalBody>
                            {activeTab === 'medicines' ? (
                                <AddMedicineForm
                                    fetchMedicines={fetchMedicines}
                                />
                            ) : null}
                        </ModalBody>
                        {/* 
                        <ModalBody>
                            {activeTab === 'pharmacies' ? (
                                <AddPharmacyForm />
                            ) : null}
                        </ModalBody> */}
                        <ModalFooter>
                            <Button variant='ghost' mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Container>
        </Box>
    );
};

export default AdminDash;
