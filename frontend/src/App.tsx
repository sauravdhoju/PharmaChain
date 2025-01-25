
import './App.css'
import { Routes, Router } from 'react-router-dom'
import { Route } from 'react-router-dom'
import App1 from './pages/PharmacyDashboard/PharmacyDashboard'

function App() {

  return (
      <Routes>
        <Route path="/" element={<App1 />} />

      </Routes>
  )
}

export default App;
