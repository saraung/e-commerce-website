import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../redux/api/usersApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { TextField, Button, CircularProgress, Container, Typography, Grid } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
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
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Login successful!');
      navigate(redirect);
    } catch (err) {
      console.error('Error:', err);
      toast.error(err?.data?.message || 'An error occurred');
    }
  };
  
  return (
    <Container sx={{ padding: 4, backgroundColor: 'rgb(34, 33, 33)' ,marginTop:"100px"}}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom sx={{ color: '#FFFFFF' }}>
            Sign In
          </Typography>
          <br /><br />
          <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: 'auto' }}>
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: 2, backgroundColor: '#FFD700', color: 'black',fontWeight:"bold", '&:hover': { backgroundColor: 'yellow' } }}
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? <CircularProgress size={24} sx={{ color: '#FFFFFF' }} /> : 'Sign In'}
            </Button>
          </form>
          <Typography variant="body2" color="textSecondary" align="center" sx={{ marginTop: 2, color: '#B0B0B0' }}>
            New Customer?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} style={{ color: '#64B5F6' }}>
              Register
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src="https://i.pinimg.com/564x/79/42/40/7942405121f20cfd57cc3c45c6f15bb1.jpg"
            alt="Login"
            style={{ width: '500px',height:"500px", borderRadius: '8px' }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
