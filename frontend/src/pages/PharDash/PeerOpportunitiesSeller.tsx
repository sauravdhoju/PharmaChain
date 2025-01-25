import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
} from '@chakra-ui/react';
import Icon from '../../components/Icon/Icon';

interface PeerOpportunity {
  pharmacy: string;
  bulkPurchase: number;
  distance: string;
  priceRange: string;
}

interface PeerOpportunitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  medicineName: string;
}

const PeerOpportunitiesModal: React.FC<PeerOpportunitiesModalProps> = ({
  isOpen,
  onClose,
  medicineName,
}) => {
  const opportunities: PeerOpportunity[] = [
    {
      pharmacy: "Health Plus Pharmacy",
      bulkPurchase: 50,
      distance: "5 km",
      priceRange: "$10-$15 per pack"
    },
    {
      pharmacy: "Wellness Drugstore",
      bulkPurchase: 30,
      distance: "10 km",
      priceRange: "$9-$14 per pack"
    }
  ];

  const handleCartClick = () => {
    alert("Added to cart!");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent borderRadius="xl" mx={4}>
        <ModalHeader borderBottomWidth="1px">
          <Text fontSize="xl" fontWeight="bold">
            {medicineName} - Peer Market Opportunities
          </Text>
          <Text fontSize="md" mt={2} fontWeight="normal">
            Potential Sellers:
          </Text>
        </ModalHeader>

        <ModalBody py={6}>
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th>Pharmacy</Th>
                <Th>Bulk Purchase</Th>
                {/* <Th>Distance</Th> */}
                <Th>Price Range</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {opportunities.map((opp, index) => (
                <Tr key={index}>
                  <Td fontWeight="medium">{opp.pharmacy}</Td>
                  <Td>{opp.bulkPurchase} units</Td>
                  {/* <Td>{opp.distance}</Td> */}
                  <Td>{opp.priceRange}</Td>
                  <Td><Button
                  onClick={handleCartClick}>
                    <Icon name="bx-cart" />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </ModalBody>

        <ModalFooter borderTopWidth="1px" gap={3}>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PeerOpportunitiesModal;