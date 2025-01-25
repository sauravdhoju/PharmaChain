// AdminDashboard.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';
// import Icon from '../../components/Icon/Icon';
import './AdminDash.scss';


interface Medicine {
    id: number;
    name: string;
    manufacturer: string;
    dosageForm: number;
  }
  
  interface Pharmacy {
    id: number;
    name: string;
    address: string;
    contact: string;
  }

const AdminDash: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'medicines' | 'pharmacies'>('medicines');
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: 1,
      name: 'Amoxicillin',
      manufacturer: 'PharmaCorp',
      dosageForm: 500,
    }
  ]);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([
    {
      id: 1,
      name: 'Bhaktapur Uupachar Kendra',
      address: 'Bhaktapur',
      contact: '9808827451'
    }
  ]);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const AddMedicineForm: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      toast({
        title: 'Medicine added.',
        status: 'success',
        duration: 3000,
      });
    };


    return (
      <Box className="dashboard__form" p={6}>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Medicine Name</FormLabel>
            <Input 
              placeholder="Enter medicine name"
              _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Manufacturer</FormLabel>
            <Input placeholder="Enter manufacturer name" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Dosage Form</FormLabel>
            <Input placeholder="Dosage in mg" />
          </FormControl>
          {/* <FormControl mb={4}>
            <FormLabel>Category</FormLabel>
            <Input placeholder="Category: Head...." />
          </FormControl> */}

          {/* <FormControl mb={4}>
            <FormLabel>Dosage Form</FormLabel>
            <Select placeholder="Select dosage form">
              {dosageForms.map(form => (
                <option key={form} value={form}>{form}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Category</FormLabel>
            <Select placeholder="Select category">
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Select>
          </FormControl> */}
          <Button 
            type="submit"
            colorScheme="blue"
            width={{ base: 'full', md: 'auto' }}
            leftIcon={<AddIcon />}
          >
            Add Medicine
          </Button>
        </form>
      </Box>
    );
  };

  const MedicineList: React.FC = () => (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Manufacturer</Th>
            <Th>Dosage Form</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {medicines.map(medicine => (
            <Tr key={medicine.id}>
              <Td>{medicine.name}</Td>
              <Td>{medicine.manufacturer}</Td>
              <Td>{medicine.dosageForm}</Td>
              <Td>
                <Flex gap={2}>
                  <IconButton
                    aria-label="Edit"
                    icon={<EditIcon />}
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );


  const PharmacyList: React.FC = () => (
    <Box overflowX="auto">
      <Table variant="simple">
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
                    aria-label="Edit"
                    icon={<EditIcon />}
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );

  return (
    <Box minH="100vh" bg="gray.50">
      <Box className="dashboard__header">
        <Container maxW="7xl">
          <Flex gap={8} py={4}>
            {(['medicines', 'pharmacies'] as const).map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                className={`dashboard__tab ${activeTab === tab ? 'dashboard__tab--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </Flex>
        </Container>
      </Box>

      <Container maxW="7xl" py={8}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="lg">
            {activeTab === 'medicines' ? 'Medicines Management' : 'Pharmacies Management'}
          </Heading>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            onClick={onOpen}
          >
            Add {activeTab === 'medicines' ? 'Medicine' : 'Pharmacy'}
          </Button>
        </Flex>

        <Box mb={6} position="relative">
          <Input
            placeholder={`Search ${activeTab}...`}
            bg="white"
            pl={10}
          />
          <SearchIcon
            position="absolute"
            left={3}
            top="50%"
            transform="translateY(-50%)"
            color="gray.400"
          />
        </Box>

        {activeTab === 'medicines' ? (
            <>
            <AddMedicineForm />
            <Box mt={6}>
                <MedicineList />
            </Box>
            </>
        ) : (
            <Box mt={6}>
            <PharmacyList />
            </Box>
        )}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Add {activeTab === 'medicines' ? 'Medicine' : 'Pharmacy'}
            </ModalHeader>
            <ModalBody>
              {activeTab === 'medicines' ? <AddMedicineForm /> : null}
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
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