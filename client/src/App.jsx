import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path='/auth' Component={Auth}/>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
