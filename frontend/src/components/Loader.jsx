import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
    return (
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        height: '50vh', // Use full viewport height, adjust as needed
      }}
    >
      <CircularProgress 
      sx={{ color: "#FFD700" }} // Custom color for the loader
    />
    </Box>
    );
  };
  
  export default Loader;