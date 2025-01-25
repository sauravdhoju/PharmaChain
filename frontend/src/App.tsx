import { Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import './App.scss';

const App = () => {

    return (
        <Box className='app'>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
        </Box>
    );
};

export default App;
