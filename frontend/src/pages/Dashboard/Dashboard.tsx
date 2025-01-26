import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Icon,
  useColorModeValue,
  ButtonGroup,
  IconButton,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { FaShoppingBag, FaStore, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DashboardCard: React.FC<{
  title: string;
  description: string;
  icon: React.ElementType;
  bgColor: string;
  onClick: () => void;
}> = ({ title, description, icon, bgColor, onClick }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const shadowColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      bg={cardBg}
      p={8}
      borderRadius="xl"
      boxShadow={`0 4px 6px -1px ${shadowColor}`}
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: `0 12px 24px -4px ${shadowColor}`,
      }}
      transition="all 0.3s"
      cursor="pointer"
      onClick={onClick}
      w="full"
    >
      <Flex align="center" gap={6}>
        <Box
          p={4}
          bg={bgColor}
          borderRadius="xl"
          boxShadow={`0 2px 4px ${shadowColor}`}
        >
          <Icon as={icon} boxSize={8} color={bgColor.replace("100", "500")} />
        </Box>
        <Box>
          <Heading as="h2" size="lg" fontWeight="bold" mb={2}>
            {title}
          </Heading>
          <Text fontSize="lg" color="gray.600">
            {description}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const headerBg = useColorModeValue("white", "gray.800");

  return (
    <Box minH="100vh" bg={bgColor} position="relative">
      {/* Header */}
      <Box bg={headerBg} shadow="lg" mb={12}>
        <Container maxW="6xl" py={6}>
          <Flex align="center" gap={4}>
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
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="6xl" py={8}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
          <GridItem>
            <DashboardCard
              title="Add Purchase Source"
              description="Manage medicine purchases and suppliers efficiently"
              icon={FaShoppingBag}
              bgColor="blue.100"
              onClick={() => navigate("/purchase_form")}
            />
          </GridItem>
          <GridItem>
            <DashboardCard
              title="View/Manage Inventory"
              description="Track and manage your medicine inventory seamlessly"
              icon={FaStore}
              bgColor="green.100"
              onClick={() => navigate("/phar_dash")}
            />
          </GridItem>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        as="footer"
        bg={headerBg}
        py={8}
        position="absolute"
        bottom={0}
        width="full"
        borderTop="1px"
        borderColor="gray.200"
      >
        <Container maxW="6xl">
          <Flex direction="column" align="center" gap={4}>
            <Text
              fontSize="md"
              fontWeight="medium"
              bgGradient="linear(to-r, blue.400, teal.400)"
              bgClip="text"
            >
              Powered by Team Asymptodes
            </Text>
            <ButtonGroup variant="ghost" spacing={4}>
              <IconButton
                aria-label="GitHub"
                icon={<FaGithub />}
                size="md"
                _hover={{ color: "blue.500" }}
              />
              <IconButton
                aria-label="Twitter"
                icon={<FaTwitter />}
                size="md"
                _hover={{ color: "blue.500" }}
              />
              <IconButton
                aria-label="LinkedIn"
                icon={<FaLinkedin />}
                size="md"
                _hover={{ color: "blue.500" }}
              />
            </ButtonGroup>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
