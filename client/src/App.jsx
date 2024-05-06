import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import PostDetails from './components/PostDetails/PostDetails'
import { useSelector } from 'react-redux';

const App = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" Component={() => <Navigate to="travels" />} />
          <Route path="/travels" Component={Home} />
          <Route path="/travels/search" Component={Home} />
          <Route path="/travels/:id" Component={PostDetails} />
          <Route path="/auth" Component={() => (!user ? <Auth /> : <Navigate to="/travels" />)} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
