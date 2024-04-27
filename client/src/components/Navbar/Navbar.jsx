import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';

import travelsLogo from '../../assets/travelsLogo.png';
import travelsText from '../../assets/travelsText.png';

const Navbar = () => {
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
        },
      }}
      position="static"
      color="inherit"
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img
          component={Link}
          to="/"
          src={travelsText}
          alt="icon"
          height="45px"
        />
        <img
          style={{ marginLeft: '10px', marginTop: '5px' }}
          src={travelsLogo}
          alt="icon"
          height="40px"
        />
      </Link>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '400px',
          [theme.breakpoints.down('sm')]: {
            width: 'auto',
          },
        }}
      >
          <div
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '400px',
              alignItems: 'center',
              [theme.breakpoints.down('sm')]: {
                width: 'auto',
                marginTop: 20,
                justifyContent: 'center',
              },
            }}
          >
            <Avatar
              sx={{
                color: 'grey',
                backgroundColor: 'grey',
              }}
              alt=""
              src={travelsLogo}
            >
              ML
            </Avatar>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
              }}
              variant="h6"
            >
              Mahmud
            </Typography>
            <Button
              variant="contained"
              sx={{ marginLeft: '20px' }}
              color="secondary"
            >
              Logout
            </Button>
          </div>
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
