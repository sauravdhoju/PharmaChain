import React, { useState, useMemo, useEffect } from 'react';

import {
    Box,
    Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Badge,
    Button,
    VStack,
    HStack,
    InputGroup,
    InputLeftElement,
    Progress,
    Switch,
    SimpleGrid,
    Card,
    CardBody,
} from '@chakra-ui/react';
import { SearchIcon, CalendarIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import PeerOpportunitiesModal from './PeerOpportunitiesBuyer';
import { Medicine } from '../AdminDash/AdminDash';
import { useBackendAPIContext } from '../../contexts/BackendAPIContext/BackendAPIContext';
import MedicineRowComponent from '../../components/MedicineRowComponent/MedicineRowComponent';

interface PharmaMedicineType {
    // name: string;
    // patientSales: {
    //     totalSales: number;
    // };
    // peerSales: {
    //     potential: number;
    //     interested: number;
    // };
    // expiry: {
    //     daysLeft: number;
    //     recommendedPeriod: number;
    // };
    // quantity: {
    //     stock: number;
    // };
    _id: string;
    pharmacy_id: string;
    medicine_id: string;
    expiry_date: Date;
    units: number;
}

enum ViewMode {
    Table = 'table',
    Card = 'card',
}

enum SortBy {
    Sales = 'sales',
    Expiry = 'expiry',
}

const MedicineInventory: React.FC = () => {
    const { client } = useBackendAPIContext();
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Table); // Toggle between table and card views
    const [searchQuery, setSearchQuery] = useState<string>(''); // Search input state
    const [sortBy, setSortBy] = useState<SortBy | null>(null); // Sorting state
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state
    const [selectedMedicine, setSelectedMedicine] = useState<string>(''); // Selected medicine for modal

    const navigate = useNavigate();

    const handlePeerOpportunitiesClick = (medicineName: string | undefined) => {
        setSelectedMedicine(medicineName);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMedicine('');
    };

    // const medicines: MedicineData[] = [
    //     {
    //         name: 'Aspirin',
    //         patientSales: {
    //             totalSales: 600,
    //         },
    //         peerSales: {
    //             potential: 100,
    //             interested: 3,
    //         },
    //         expiry: {
    //             daysLeft: -25,
    //             recommendedPeriod: 120,
    //         },
    //         quantity: {
    //             stock: 150,
    //         },
    //     },
    //     {
    //         name: 'Amoxicillin',
    //         patientSales: {
    //             totalSales: 180,
    //         },
    //         peerSales: {
    //             potential: 30,
    //             interested: 2,
    //         },
    //         expiry: {
    //             daysLeft: -117,
    //             recommendedPeriod: 60,
    //         },
    //         quantity: {
    //             stock: 50,
    //         },
    //     },
    // ];
    const [pharmaMedicines, setPharmaMedicines] = useState<
        PharmaMedicineType[]
    >([]);

    const fetchPharmaMedicines = async () => {
        try {
            const response = await client.get('/pharma/medicines');
            const data = await response.data.pharmaMedicines;
            if (data) {
                setPharmaMedicines(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // const handlePeerOpportunitiesClick = (medicineName: string) => {
    //     navigate(`/peer-opportunities/${medicineName}`);
    // };

    // const filteredMedicines = useMemo(() => {
    //     return medicines
    //         .filter((medicine) =>
    //             medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    //         )
    //         .sort((a, b) => {
    //             if (sortBy === SortBy.Sales) {
    //                 return (
    //                     b.patientSales.totalSales - a.patientSales.totalSales
    //                 );
    //             } else if (sortBy === SortBy.Expiry) {
    //                 return a.expiry.daysLeft - b.expiry.daysLeft;
    //             }
    //             return 0;
    //         });
    // }, [medicines, searchQuery, sortBy]);

    useEffect(() => {
        fetchPharmaMedicines();
    }, []);

    return (
        <Box p={6} maxW='1120px' margin='0 auto' overflowY='auto'>
            <Text fontSize='2xl' mb={4} fontWeight='bold'>
                Medicine Inventory and Sales Potential
            </Text>

            {/* Search and View Toggle */}
            <HStack mb={6} justifyContent='space-between'>
                <InputGroup maxW='400px'>
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon color='gray.400' aria-label='Search icon' />
                    </InputLeftElement>
                    <Input
                        placeholder='Search medicines...'
                        bg='white'
                        borderRadius='lg'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </InputGroup>

                <HStack spacing={4} alignItems='center'>
                    <Button size='sm' onClick={() => setSortBy(SortBy.Sales)}>
                        Sort by Sales
                    </Button>
                    <Button size='sm' onClick={() => setSortBy(SortBy.Expiry)}>
                        Sort by Expiry
                    </Button>
                    <HStack>
                        <Text>Table View</Text>
                        <Switch
                            isChecked={viewMode === ViewMode.Card}
                            onChange={(e) =>
                                setViewMode(
                                    e.target.checked
                                        ? ViewMode.Card
                                        : ViewMode.Table
                                )
                            }
                        />
                        <Text>Card View</Text>
                    </HStack>
                </HStack>
            </HStack>

            {/* Alerts for Critical Medicines */}
            <Box mb={6} role='alert'>
                {/* {filteredMedicines.some(
                    (medicine) => medicine.expiry.daysLeft <= 0
                ) && (
                    <HStack
                        p={4}
                        bg='red.50'
                        borderRadius='lg'
                        border='1px solid'
                        borderColor='red.200'
                    >
                        <CalendarIcon color='red.500' />
                        <Text color='red.500' fontWeight='medium'>
                            Some medicines are past their expiry date. Immediate
                            action required!
                        </Text>
                    </HStack>
                )} */}
            </Box>

            {/* Medicine List */}
            {pharmaMedicines.length === 0 ? (
                <Box textAlign='center' py={6}>
                    <Text>No medicines found matching your search.</Text>
                </Box>
            ) : viewMode === ViewMode.Table ? (
                <Box overflowX='auto'>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Medicine</Th>
                                <Th>Quantity</Th>
                                <Th>Expiry Details</Th>
                                <Th>Sales Potential</Th>
                                <Th>Peer Market</Th>
                            </Tr>
                        </Thead>
                        {/* <Tbody>
                            {filteredMedicines.map((medicine) => (
                                <Tr>
                                    <Td>
                                        <VStack align='start'>
                                            <Text fontWeight='medium'>
                                                {medicine.name}
                                            </Text>
                                            <Text
                                                fontSize='sm'
                                                color='gray.500'
                                            ></Text>
                                        </VStack>
                                    </Td>
                                    <Td>
                                        <Text fontWeight='medium'>
                                            {medicine.quantity.stock}
                                        </Text>
                                    </Td>
                                    <Td>
                                        <HStack>
                                            <CalendarIcon
                                                color={
                                                    medicine.expiry.daysLeft <=
                                                    0
                                                        ? 'red.500'
                                                        : 'yellow.500'
                                                }
                                            />
                                            <Badge
                                                colorScheme={
                                                    medicine.expiry.daysLeft <=
                                                    0
                                                        ? 'red'
                                                        : 'yellow'
                                                }
                                            >
                                                {medicine.expiry.daysLeft} days
                                                left
                                            </Badge>
                                        </HStack>
                                        <Text fontSize='sm'>
                                            Recommended Period:{' '}
                                            {medicine.expiry.recommendedPeriod}{' '}
                                            days
                                        </Text>
                                    </Td>
                                    <Td>
                                        <VStack align='start'>
                                            <Text fontWeight='bold'>
                                                Total Sales
                                            </Text>
                                            <Text>
                                                Total Sales:{' '}
                                                {
                                                    medicine.patientSales
                                                        .totalSales
                                                }{' '}
                                                units
                                            </Text>
                                            <Text fontWeight='bold'>
                                                Peer Sales
                                            </Text>
                                            <Text>
                                                Build Sales Potential:{' '}
                                                {
                                                    medicine.patientSales
                                                        .totalSales
                                                }{' '}
                                                units
                                            </Text>
                                            <Progress
                                                colorScheme='green'
                                                size='sm'
                                                value={
                                                    (medicine.patientSales
                                                        .totalSales /
                                                        1000) *
                                                    100
                                                }
                                            />
                                        </VStack>
                                    </Td>
                                    <Td>
                                        <Button
                                            size='sm'
                                            colorScheme='blue'
                                            variant='outline'
                                            rightIcon={<ExternalLinkIcon />}
                                            onClick={() =>
                                                handlePeerOpportunitiesClick(
                                                    medicine.name
                                                )
                                            }
                                        >
                                            Peer Opportunities
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody> */}

                        {/* <Tbody>
                        {filteredMedicines.map((medicine) => (
                            <MedicineRowComponent
                                key={medicine.name}
                                medicine={medicine}
                                onPeerOpportunitiesClick={handlePeerOpportunitiesClick}
                            />
                        ))}
                    </Tbody> */}

                        <Tbody>
                            {pharmaMedicines.map((medicine) => (
                                <MedicineRowComponent
                                    key={medicine._id}
                                    pharmaMedicineId={medicine._id}
                                    medicineId={medicine.medicine_id}
                                    pharmacyId={medicine.pharmacy_id}
                                    expiryDate={medicine.expiry_date}
                                    units={medicine.units}
                                    handlePeerOpportunitiesClick={
                                        handlePeerOpportunitiesClick
                                    }
                                />
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            ) : (
                <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                    {filteredMedicines.map((medicine) => (
                        <Card>
                            <CardBody>
                                <VStack align='start' spacing={3}>
                                    <Text fontWeight='bold' fontSize='lg'>
                                        {medicine.name}
                                    </Text>
                                    <Text fontWeight='bold'>Patient Sales</Text>
                                    <Text>
                                        Total Sales:{' '}
                                        {medicine.patientSales.totalSales} units
                                    </Text>
                                    <Text fontWeight='bold'>Peer Sales</Text>
                                    <Text>
                                        Buld Sales Potential:{' '}
                                        {medicine.patientSales.totalSales} units
                                    </Text>
                                    <Progress
                                        colorScheme='green'
                                        size='sm'
                                        value={
                                            (medicine.patientSales.totalSales /
                                                1000) *
                                            100
                                        }
                                    />
                                    <HStack>
                                        <CalendarIcon
                                            color={
                                                medicine.expiry.daysLeft <= 0
                                                    ? 'red.500'
                                                    : 'yellow.500'
                                            }
                                        />
                                        <Badge
                                            colorScheme={
                                                medicine.expiry.daysLeft <= 0
                                                    ? 'red'
                                                    : 'yellow'
                                            }
                                        >
                                            {medicine.expiry.daysLeft} days left
                                        </Badge>
                                    </HStack>
                                    <Button
                                        size='sm'
                                        colorScheme='blue'
                                        variant='outline'
                                        rightIcon={<ExternalLinkIcon />}
                                    >
                                        Restock
                                    </Button>
                                </VStack>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            )}

            {/* Peer Opportunities Modal */}
            <PeerOpportunitiesModal
                isOpen={isModalOpen}
                onClose={closeModal}
                medicineName={selectedMedicine}
            />
        </Box>
    );
};

export default MedicineInventory;
