import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Container,
  Grid,
  TextField,
  Button,
  Avatar,
  Typography,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Loader from '../../components/Loader';
import { useProfileMutation } from '../../redux/api/usersApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
        setIsEditing(false); // Disable editing after successful update
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true); // Enable editing when edit icon is clicked
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#1f1f1f',
        padding: '2rem 1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: 'black',
          padding: '2rem',
          borderRadius: '20px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5)',
          color: 'white',
          marginTop: '15px'
        }}
      >
        <Box sx={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <Avatar
            sx={{
              margin: '0 auto',
              width: 100,
              height: 100,
              bgcolor: '#FFD700',
              fontSize: '2.5rem',
              color:"black"
            }}
          >
            {userInfo.username.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h4" sx={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
            {isEditing ? (
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                InputLabelProps={{ style: { color: 'white' } }}
                sx={{
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'gray',
                  },
                }}
              />
            ) : (
              <Typography>{username}</Typography>
            )}
          </Typography>
          <br />
          <Typography variant="body1" color="gray">
            {isEditing ? (
              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{ style: { color: 'white' } }}
                sx={{
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'gray',
                  },
                }}
              />
            ) : (
              email
            )}
          </Typography>
        </Box>

        {isEditing && (
          <form onSubmit={submitHandler}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputLabelProps={{ style: { color: 'white' } }}
                  sx={{
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'gray',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputLabelProps={{ style: { color: 'white' } }}
                  sx={{
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'gray',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: 'yellow',
                    color: 'black',
                    '&:hover': {
                      backgroundColor: '#f0c040',
                    },
                  }}
                >
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </form>
        )}

        <Box sx={{ marginTop: '2rem', textAlign: 'center' }}>
          <Button
            onClick={handleEditClick}
            sx={{
              backgroundColor: 'gray',
              color: 'white',
              '&:hover': {
                backgroundColor: '#5f5f5f',
              },
            }}
            startIcon={<EditIcon />}
          >
            Edit Profile
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            component={Link}
            to="/user-orders"
            sx={{
              marginTop: '0rem',
              backgroundColor: '#5f5f5f',
              color: 'white',
              '&:hover': {
                backgroundColor: '#4a4a4a',
              },
            }}
          >
            My Orders
          </Button>
        </Box>

        {loadingUpdateProfile && <Loader />}
      </Container>
    </Box>
  );
};

export default Profile;
