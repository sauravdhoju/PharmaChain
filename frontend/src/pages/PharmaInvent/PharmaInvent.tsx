import React, { useState } from 'react';
import { Box, Heading, Alert, AlertDescription, AlertIcon, Card, CardHeader, CardBody, Button, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaStore } from 'react-icons/fa';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PageContainer from '../../components/PageContainer/PageContainer';

import './PharmaInvent.scss';

interface SalesTrend {
  month: string;
  sales: number;
}

interface InventoryItem {
  id: number;
  name: string;
  stock: number;
  expiryDate: string;
  salesTrend: SalesTrend[];
  predictedStockout: string;
  nearbyPharmacies: number;
}

const PharmaInvent: React.FC = () => {
  const [inventory] = useState<InventoryItem[]>([
    {
      id: 1,
      name: "Amoxicillin 500mg",
      stock: 150,
      expiryDate: "2025-06-15",
      salesTrend: [
        { month: 'Jan', sales: 45 },
        { month: 'Feb', sales: 52 },
        { month: 'Mar', sales: 48 },
        { month: 'Apr', sales: 51 }
      ],
      predictedStockout: "2025-05-01",
      nearbyPharmacies: 3
    },
    {
      id: 2,
      name: "Ibuprofen 200mg",
      stock: 200,
      expiryDate: "2025-03-30",
      salesTrend: [
        { month: 'Jan', sales: 65 },
        { month: 'Feb', sales: 58 },
        { month: 'Mar', sales: 62 },
        { month: 'Apr', sales: 60 }
      ],
      predictedStockout: "2025-07-15",
      nearbyPharmacies: 5
    }
  ]);

  const calculateDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getAlertSeverity = (daysUntilExpiry: number) => {
    if (daysUntilExpiry <= 30) return 'error';
    if (daysUntilExpiry <= 90) return 'warning';
    return 'success';
  };

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const headerBg = useColorModeValue("white", "gray.800");

  return (
    <PageContainer>
      <Box className="dashboard" p={6} maxW='1023px' margin='0 auto' overflowY='auto'>
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

        <Heading as="h2" size="lg" mb={6}>
          Pharmacy Inventory Dashboard
        </Heading>

        {/* Expiry Alerts Section */}
        <Box mb={6}>
          <Heading as="h3" size="md" mb={4}>
            Expiry Alerts
          </Heading>
          {inventory.map((item) => {
            const daysUntilExpiry = calculateDaysUntilExpiry(item.expiryDate);
            return (
              <Alert status={getAlertSeverity(daysUntilExpiry)} key={item.id} mb={4}>
                <AlertIcon />
                <AlertDescription>
                  {item.name} - {daysUntilExpiry} days until expiry
                  {daysUntilExpiry <= 90 && item.nearbyPharmacies > 0 && (
                    <span>
                      {' '}
                      ({item.nearbyPharmacies} nearby pharmacies might be interested)
                    </span>
                  )}
                </AlertDescription>
              </Alert>
            );
          })}
        </Box>

        {/* Sales Trends and Predictions */}
        {inventory.map((item) => (
          <Card key={item.id} mb={6}>
            <CardHeader>
              <Heading as="h4" size="sm">
                {item.name} - Sales Trend Analysis
              </Heading>
            </CardHeader>
            <CardBody>
              <Box height="300px" mb={4}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={item.salesTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#3182ce" name="Monthly Sales" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
              <Box>
                <p>Predicted stockout date: {item.predictedStockout}</p>
                {new Date(item.predictedStockout) > new Date(item.expiryDate) && (
                  <Alert status="warning" mt={4}>
                    <AlertIcon />
                    <AlertDescription>
                      Current stock may not sell out before expiry. Consider reducing future orders or collaborating with nearby pharmacies.
                    </AlertDescription>
                  </Alert>
                )}
              </Box>
            </CardBody>
          </Card>
        ))}

        {/* Inter-pharmacy Collaboration */}
        <Card>
          <CardHeader>
            <Heading as="h4" size="sm">
              Nearby Pharmacy Network
            </Heading>
          </CardHeader>
          <CardBody>
            {inventory
              .filter((item) => calculateDaysUntilExpiry(item.expiryDate) <= 90)
              .map((item) => (
                <Box
                  key={item.id}
                  p={4}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={4}
                >
                  <Box>
                    <Heading as="h5" size="sm">
                      {item.name}
                    </Heading>
                    <p>{item.nearbyPharmacies} pharmacies within 5km might be interested</p>
                  </Box>
                  <Button colorScheme="blue" onClick={() => alert(`Notifying pharmacies about ${item.name}`)}>
                    Notify Network
                  </Button>
                </Box>
              ))}
          </CardBody>
        </Card>
      </Box>
    </PageContainer>
  );
};

export default PharmaInvent;
