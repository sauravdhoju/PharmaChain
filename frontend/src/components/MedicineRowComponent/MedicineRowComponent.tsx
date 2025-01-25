import React from 'react';
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

interface MedicineProps {
  name: string;
  quantity: {
    stock: number;
  };
  expiry: {
    daysLeft: number;
    recommendedPeriod: number;
  };
  patientSales: {
    totalSales: number;
  };
  onPeerOpportunitiesClick: (medicineName: string) => void;
}

const MedicineRowComponent: React.FC<MedicineProps> = ({
  name,
  quantity,
  expiry,
  patientSales,
  onPeerOpportunitiesClick,
}) => {
  return (
    <Tr>
      <Td>
        <VStack align="start">
          <Text fontWeight="medium">{name}</Text>
          <Text fontSize="sm" color="gray.500"></Text>
        </VStack>
      </Td>
      <Td>
        <Text fontWeight="medium">{quantity.stock}</Text>
      </Td>
      <Td>
        <HStack>
          <CalendarIcon
            color={expiry.daysLeft <= 0 ? 'red.500' : 'yellow.500'}
          />
          <Badge colorScheme={expiry.daysLeft <= 0 ? 'red' : 'yellow'}>
            {expiry.daysLeft} days left
          </Badge>
        </HStack>
        <Text fontSize="sm">
          Recommended Period: {expiry.recommendedPeriod} days
        </Text>
      </Td>
      <Td>
        <VStack align="start">
          <Text fontWeight="bold">Total Sales</Text>
          <Text>Total Sales: {patientSales.totalSales} units</Text>
          <Text fontWeight="bold">Peer Sales</Text>
          <Text>
            Build Sales Potential: {patientSales.totalSales} units
          </Text>
          <Progress
            colorScheme="green"
            size="sm"
            value={(patientSales.totalSales / 1000) * 100}
          />
        </VStack>
      </Td>
      <Td>
        <Button
          size="sm"
          colorScheme="blue"
          variant="outline"
          rightIcon={<ExternalLinkIcon />}
          onClick={() => onPeerOpportunitiesClick(name)}
        >
          Peer Opportunities
        </Button>
      </Td>
    </Tr>
  );
};

export default MedicineRowComponent;
