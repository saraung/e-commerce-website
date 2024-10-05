import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { Box, Typography } from '@mui/material';

const Ratings = ({ value, text, color }) => {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars > 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} style={{ color: color, marginLeft: '0.25rem' }} />
      ))}

      {halfStars === 1 && (
        <FaStarHalfAlt style={{ color: color, marginLeft: '0.25rem' }} />
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} style={{ color: color, marginLeft: '0.25rem' }} />
      ))}

      {text && (
        <Typography
          variant="body2"
          sx={{ marginLeft: '1rem', color: color }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
};

Ratings.defaultProps = {
  color: '#FFEB3B', // Material UI uses hex codes instead of Tailwind color classes
};

export default Ratings;
