import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import BookingPage from './Pages/BookingPage';
import BookingConfirmationPage from './Pages/BookingConfirmationPage';
import AboutPage from './Pages/AboutPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/reservations" element={<BookingPage />} />
      <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/reservations" element={<BookingPage />} />
    </Routes>
  )
}

export default App
