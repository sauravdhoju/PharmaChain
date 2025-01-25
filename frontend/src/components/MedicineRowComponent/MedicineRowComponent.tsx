import React, { useEffect, useState } from 'react';
import {
    Tr,
    Td,
    VStack,
    HStack,
    Text,
    Badge,
    Progress,
    Button,
} from '@chakra-ui/react';
import { CalendarIcon, ExternalLinkIcon } from '@chakra-ui/icons';

// interface MedicineProps {
//   name: string;
//   quantity: {
//     stock: number;
//   };
//   expiry: {
//     daysLeft: number;
//     recommendedPeriod: number;
//   };
//   patientSales: {
//     totalSales: number;
//   };
//   onPeerOpportunitiesClick: (medicineName: string) => void;
// }

import { useBackendAPIContext } from '../../contexts/BackendAPIContext/BackendAPIContext';
import { Medicine } from '../../pages/AdminDash/AdminDash';
import { differenceInDays } from 'date-fns';

interface MedicineProps {
    pharmaMedicineId: string;
    units: number;
    medicineId: string;
    pharmacyId: string;
    expiryDate: Date;
    onPeerOpportunitiesClick: (medicineName: string) => void;
}
interface Pharmacy {
    id: number;
    pharmacyname: string;
    address: string;
    contact: string;
}

const MedicineRowComponent = ({
    //   name,
    //   quantity,
    //   expiry,
    //   patientSales,
    pharmaMedicineId,
    pharmacyId,
    medicineId,
    expiryDate,
    units,
    onPeerOpportunitiesClick,
}: MedicineProps) => {
    const { client } = useBackendAPIContext();
    const [medicine, setMedicine] = useState<Medicine | null>(null);
    const [salesPotential, setSalesPotential] = useState(0);
    const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);
    const fetchMedicine = async () => {
        try {
            const response = await client.get(`/medicine/${medicineId}`);
            const data = await response.data;

            if (data) setMedicine(data.medicine);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchPharmacy = async () => {
        try {
            const response = await client.get(`/pharmacy`);
            const data = response.data;
            if (data) setPharmacy(data.pharmacy);
        } catch (error) {
            console.error(error);
        }
    };
    const todayDate = new Date(Date.now());
    // const [salesPredictionList, setSalesPredictionList] = useState<number[]>(
    //     []
    // );

    const fetchSalesPotential = async () => {
        try {
            const response = await client.post('/predictions/generate', {
                medicine_name: medicine?.name,
                pharmacy_name: pharmacy?.pharmacyname,
                months_ahead: 12,
            });
            const data = await response.data;
            setSalesPotential(
                data.Sales_prediction.predictions[todayDate.getMonth()]
            );
            const predictions = await data.predictions;
            return predictions;
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        const initializeData = async () => {
            await Promise.all([fetchMedicine(), fetchPharmacy()]);
        };
        initializeData().catch(console.error);
    }, []);

    useEffect(() => {
        // if (!medicine || !pharmacy) return;
        if (medicine && pharmacy) fetchSalesPotential();
        // const;k
    }, [medicine, pharmacy]);
    return (
        <>
            <Tr>
                <Td>
                    <VStack align='start'>
                        <Text fontWeight='medium'>{medicine?.name}</Text>
                        <Text fontSize='sm' color='gray.500'></Text>
                    </VStack>
                </Td>
                <Td>
                    <Text fontWeight='medium'>{units}</Text>
                </Td>
                <Td>
                    <HStack>
                        <CalendarIcon
                            color={
                                differenceInDays(
                                    expiryDate,
                                    new Date(Date.now())
                                ) <= 0
                                    ? 'red.500'
                                    : 'yellow.500'
                            }
                        />
                        <Badge
                            colorScheme={
                                differenceInDays(
                                    expiryDate,
                                    new Date(Date.now())
                                ) <= 0
                                    ? 'red'
                                    : 'yellow'
                            }
                        >
                            {differenceInDays(expiryDate, new Date(Date.now()))}{' '}
                            days left
                        </Badge>
                    </HStack>
                    <Text fontSize='sm'>Recommended Period: {20} days</Text>
                </Td>
                <Td>
                    <VStack align='start'>
                        <Text fontWeight='bold'>Total Sales</Text>
                        <Text>Total Sales: {salesPotential} units</Text>
                        <Text fontWeight='bold'>Peer Sales</Text>
                        <Text>
                            {/* Build Sales Potential: {patientSales.totalSales}{' '} */}
                            units
                        </Text>
                        <Progress
                            colorScheme='green'
                            size='sm'
                            // value={(patientSales.totalSales / 1000) * 100}
                        />
                    </VStack>
                </Td>
                <Td>
                    <Button
                        size='sm'
                        colorScheme='blue'
                        variant='outline'
                        rightIcon={<ExternalLinkIcon />}
                        // onClick={() => onPeerOpportunitiesClick(name)}
                    >
                        Peer Opportunities
                    </Button>
                </Td>
            </Tr>
            {/* <Tr>
                <Td>
                    <Text fontWeight='medium'>{name}</Text>
                </Td>
                <Td>
                    <Text>{units}</Text>
                </Td>
                <Td>
                    <Badge colorScheme={daysLeft <= 0 ? 'red' : 'yellow'}>
                        {daysLeft} days left
                    </Badge>
                </Td>
                <Td>
                    <Text>{totalSales} units</Text>
                </Td>
                <Td>
                    <Button
                        size='sm'
                        colorScheme='blue'
                        onClick={() => onPeerOpportunitiesClick(name)}
                    >
                        Peer Opportunities
                    </Button>
                </Td>
            </Tr> */}
        </>
    );
};

export default MedicineRowComponent;
