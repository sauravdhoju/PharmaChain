import { Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import PharmaInvent from './pages/PharmaInvent/PharmaInvent';
import AddMedicineForm from './pages/AdminDash/AdminDash';
import './App.scss';

const App = () => {

    return (
        <Box className='app'>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/pharma_invent' element={<PharmaInvent />} />
                    <Route path='/add_medicine' element={<AddMedicineForm />} />
                </Routes>
        </Box>
    );
};

export default App;
