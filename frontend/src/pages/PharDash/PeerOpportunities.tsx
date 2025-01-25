import React, { useState, useEffect } from 'react';
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
  Spinner,
  Center,
} from '@chakra-ui/react';

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
  fetchOpportunities: (medicineName: string) => Promise<PeerOpportunity[]>;
}

const PeerOpportunitiesModal: React.FC<PeerOpportunitiesModalProps> = ({
  isOpen,
  onClose,
  medicineName,
  fetchOpportunities,
}) => {
  const [opportunities, setOpportunities] = useState<PeerOpportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setError(null);

      fetchOpportunities(medicineName)
        .then((data) => {
          setOpportunities(data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch opportunities. Please try again.");
          setLoading(false);
        });
    }
  }, [isOpen, medicineName, fetchOpportunities]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent borderRadius="xl" mx={4}>
        <ModalHeader borderBottomWidth="1px">
          <Text fontSize="xl" fontWeight="bold">
            {medicineName} - Peer Market Opportunities
          </Text>
          <Text fontSize="md" mt={2} fontWeight="normal">
            Potential Buyers:
          </Text>
        </ModalHeader>

        <ModalBody py={6}>
          {loading ? (
            <Center>
              <Spinner size="lg" />
            </Center>
          ) : error ? (
            <Text color="red.500" textAlign="center">
              {error}
            </Text>
          ) : opportunities.length === 0 ? (
            <Text textAlign="center" color="gray.500">
              No opportunities available for this medicine.
            </Text>
          ) : (
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Pharmacy</Th>
                  <Th>Bulk Purchase</Th>
                  <Th>Distance</Th>
                  <Th>Price Range</Th>
                </Tr>
              </Thead>
              <Tbody>
                {opportunities.map((opp, index) => (
                  <Tr key={index}>
                    <Td fontWeight="medium">{opp.pharmacy}</Td>
                    <Td>{opp.bulkPurchase} units</Td>
                    <Td>{opp.distance}</Td>
                    <Td>{opp.priceRange}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </ModalBody>

        <ModalFooter borderTopWidth="1px" gap={3}>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          {opportunities.length > 0 && (
            <Button 
              colorScheme="blue"
              bgGradient="linear(to-r, blue.400, blue.500)"
              _hover={{
                bgGradient: "linear(to-r, blue.500, blue.600)",
              }}
            >
              Contact Peers
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PeerOpportunitiesModal;
