import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  useToast,
  Flex,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaStore } from 'react-icons/fa';
import { useBackendAPIContext } from '../../contexts/BackendAPIContext/BackendAPIContext';

type Medicine = {
  _id: string;
  name: string;
};

type FormData = {
  medicine_id: string;
  units: string;
  expiry_date: string;
};

const PurchaseForm: React.FC = () => {
  const { client } = useBackendAPIContext();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    medicine_id: '',
    units: '',
    expiry_date: '',
  });
  const toast = useToast();

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const headerBg = useColorModeValue("white", "gray.800");

  // Fetch Medicines from the Backend
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await client.get('/medicines');
        const data = response.data;

        if (data) {
          setMedicines(data.medicines);
        }
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Failed to load medicines.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchMedicines();
  }, [client, toast]);

  // Submit the Purchase Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send the form data as a JSON body
      await client.post('/pharma/medicine/purchase', formData);

      toast({
        title: 'Success',
        description: 'Purchase submitted successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Reset the form
      setFormData({
        medicine_id: '',
        units: '',
        expiry_date: '',
      });
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to submit purchase.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box minH="100vh" bg={bgColor} position="relative">
      {/* Header */}
      <Box bg={headerBg} shadow="lg" mb={8}>
        <Flex maxW="6xl" mx="auto" py={6} align="center" gap={4}>
          <Icon as={FaStore} boxSize={10} color="blue.500" />
          <Heading
            as="h1"
            size="2xl"
            bgGradient="linear(to-r, blue.400, teal.400)"
            bgClip="text"
            fontWeight="extrabold"
          >
            HealthCare Pharmacy
          </Heading>
        </Flex>
      </Box>

      {/* Main Content */}
      <Box maxW="xl" mx="auto" p={6} bg={useColorModeValue("white", "gray.800")} borderRadius="xl" shadow="lg">
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Purchase Medicine
        </Heading>
        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Medicine</FormLabel>
              <Select
                name="medicine_id"
                placeholder="Select a medicine"
                value={formData.medicine_id}
                onChange={handleChange}
              >
                {medicines.map((medicine) => (
                  <option key={medicine._id} value={medicine._id}>
                    {medicine.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Units</FormLabel>
              <Input
                type="number"
                min={1}
                name="units"
                value={formData.units}
                onChange={handleChange}
                placeholder="Enter quantity"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Expiry Date</FormLabel>
              <Input
                type="date"
                name="expiry_date"
                value={formData.expiry_date}
                onChange={handleChange}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              isLoading={isLoading}
              loadingText="Submitting"
            >
              Submit Purchase
            </Button>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default PurchaseForm;
