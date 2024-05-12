import { useSelector } from 'react-redux';
import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
  useTheme,
  Box,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutQuery } from '../../redux/features/auth/authApi';

import travelsLogo from '../../assets/travelsLogo.png';
import memoriesText from '../../assets/memoriesText.png';
import { useGetTravelsQuery } from '../../redux/features/travel/travelApi';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { refetch } = useGetTravelsQuery();
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const handleLogout = async () => {
    setLogout(true);
    refetch();
  };

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
          src={travelsLogo}
          alt="icon"
          height="45px"
        />
        <img
          style={{ marginLeft: '10px', marginTop: '5px' }}
          src={memoriesText}
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
        {user ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '400px',
              alignItems: 'center',
              [theme.breakpoints.down('sm')]: {
                width: 'auto',
                marginTop: 4,
                justifyContent: 'center',
              },
            }}
          >
            <Avatar
              sx={{
                color: theme.palette.getContrastText(deepPurple[500]),
                backgroundColor: deepPurple[500],
              }}
              alt={user?.name}
              src={user?.avatar?.url}
            >
              {user?.name.charAt(0)}
            </Avatar>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
              }}
              variant="h6"
            >
              {user?.name}
            </Typography>
            <Button
              variant="contained"
              sx={{ marginLeft: '20px' }}
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
