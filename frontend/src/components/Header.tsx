import React from 'react';

// Define the type for the component's props
interface HeaderProps {
    shopName: string;
}

const Header: React.FC<HeaderProps> = ({ shopName }) => {
    return (
        <header className="bg-blue-600 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-center">
                <h1 className="text-2xl font-bold">{shopName}</h1>
            </div>
        </header>
    );
};

export default Header;
