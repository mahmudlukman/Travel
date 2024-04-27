import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/features/auth/authApi';
import { useRegisterMutation } from '../../redux/features/auth/authApi';
import { toast } from 'react-hot-toast';

import Icon from './icon';
import Input from './Input';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const theme = useTheme();
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const [login, { isSuccess, data, isLoading, error }] = useLoginMutation();
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = form;
    if (isSignup) {
      await register(data);
    } else {
      await login(data);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || 'Welcome';
      toast.success(message);
      navigate('/');
    }
    if (error) {
      if ('data' in error) {
        const errorData = error;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: theme.spacing(2),
        }}
        elevation={6}
      >
        <Avatar
          sx={{
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? 'Sign up' : 'Sign in'}
        </Typography>
        <form
          sx={{
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
          }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ margin: theme.spacing(3, 0, 2) }}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
