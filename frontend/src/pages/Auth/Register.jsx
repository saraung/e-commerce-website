import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../../redux/api/usersApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { TextField, Button, CircularProgress, Container, Typography, Grid } from '@mui/material';

const Register = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success('User successfully registered');
      } catch (err) {
        console.log(err);
        toast.error(err.data || 'An error occurred');
      }
    }
  };

  return (
    <Container sx={{ padding: 4, backgroundColor: 'rgb(34, 33, 33)' ,marginTop:"100px"}}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom sx={{ color: '#FFFFFF' }}>
            Register
          </Typography>
           <br /><br />
          <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: 'auto' }}>
            <TextField
              label="Name"
              type="text"
              variant="filled"
              fullWidth
              sx={{ marginBottom: 2, backgroundColor: '#555555', input: { color: '#FFFFFF' }, fieldset: { borderColor: '#888888' } }}
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Email Address"
              type="email"
              variant="filled"
              fullWidth
              sx={{ marginBottom: 2, backgroundColor: '#555555', input: { color: '#FFFFFF' }, fieldset: { borderColor: '#888888' } }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="filled"
              fullWidth
              sx={{ marginBottom: 2, backgroundColor: '#555555', input: { color: '#FFFFFF' }, fieldset: { borderColor: '#888888' } }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="filled"
              fullWidth
              sx={{ marginBottom: 2, backgroundColor: '#555555', input: { color: '#FFFFFF' }, fieldset: { borderColor: '#888888' } }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: 2, backgroundColor: '#FFD700', color: 'black',fontWeight:"bold", '&:hover': { backgroundColor: 'yellow' } }}
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? <CircularProgress size={24} sx={{ color: '#FFFFFF' }} /> : 'Register'}
            </Button>
          </form>
          <Typography variant="body2" color="textSecondary" align="center" sx={{ marginTop: 2, color: '#B0B0B0' }}>
            Already have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} style={{ color: '#64B5F6' }}>
              Login
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src="https://i.pinimg.com/564x/79/42/40/7942405121f20cfd57cc3c45c6f15bb1.jpg"
            alt="Register"
            style={{ height:"500px",width: '500px', borderRadius: '8px' }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
