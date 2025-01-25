import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';

// Define the type for the component's props
interface HeaderProps {
    shopName: string;
}

const Header: React.FC<HeaderProps> = ({ shopName }) => {
    return (
        <Box bg="blue.600" color="white" py={4} boxShadow="md">
            <Flex justify="center">
                <Heading as="h1" size="lg">
                    {shopName}
                </Heading>
            </Flex>
        </Box>
    );
};

export default Header;
