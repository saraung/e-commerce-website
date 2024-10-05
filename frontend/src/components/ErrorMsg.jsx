import React from 'react';
import { Button, Typography, Box } from '@mui/material';

const Error = () => {
  const handleRetry = () => {
    // Reload the current page to retry the connection
    window.location.reload();
  };

  return (
    <Box sx={{ color: 'red', textAlign: 'center', mt: 4 }}>
      <Typography variant="h4">Connection Error</Typography>
      <Typography variant="body1">
        Unable to connect to the server. Please try again later.
      </Typography>
      <Button variant="contained" color="error" onClick={handleRetry} sx={{ mt: 2 }}>
        Retry
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        If the problem continues, please contact support.
      </Typography>
    </Box>
  );
};

export default Error;
