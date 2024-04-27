import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/auth" Component={Auth} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
