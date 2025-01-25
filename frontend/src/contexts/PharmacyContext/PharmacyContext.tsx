import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useBackendAPIContext } from '../BackendAPIContext/BackendAPIContext';

type PharmacyType = {
    id: string;
    email: string;
    pharmacyname: string;
};

type PharmacyContextType = {
    pharmacy: PharmacyType | null;
    setPharmacy: React.Dispatch<React.SetStateAction<PharmacyType | null>>;
    fetchPharmacy: () => {};
};

const PharmacyContext = React.createContext<PharmacyContextType | null>(null);

const PharmacyProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
}) => {
    const navigate = useNavigate();
    const [pharmacy, setPharmacy] =
        useState<PharmacyContextType['pharmacy']>(null);
    const { client } = useBackendAPIContext();
    const fetchPharmacy = async () => {
        client
            .get('/pharmacy')
            .then((res) => {
                setPharmacy(res.data.pharmacy);
                navigate('/');
            })
            .catch((err) => {
                console.warn(err);
                // navigate('/login');
            });
    };

    return (
        <PharmacyContext.Provider
            value={{ pharmacy, setPharmacy, fetchPharmacy }}
        >
            {children}
        </PharmacyContext.Provider>
    );
};

export const usePharmacyContext = () => {
    const context = useContext(PharmacyContext);
    if (!context) {
        throw new Error(
            'usePharmacyContext must be used within a PharmacyProvider'
        );
    }
    return context;
};

export default PharmacyProvider;
