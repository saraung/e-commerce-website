import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        bgcolor: "#1A1A1A", // Matte black background
        color: "white",
        borderRadius: 2,
        boxShadow: 3,
        position: "relative",
      }}
    >
      <Box position="relative">
        <Link to={`/product/${p._id}`}>
          <CardMedia
            component="img"
            height="170"
            image={p.images[0]}
            alt={p.name}
            sx={{ objectFit: "cover", cursor: "pointer" }}
          />
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              bgcolor: "lightblue",
              color: "black",
              borderRadius: "12px",
              px: 1.5,
              py: 0.5,
            }}
          >
            {p?.brand}
          </Typography>
        </Link>
        <HeartIcon product={p} />
      </Box>

      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            {p?.name}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "green",
              fontWeight: "bold",
            }}
          >
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </Typography>
        </Box>

        <Typography variant="body2" color="#CFCFCF" sx={{ mt: 1, mb: 2 }}>
          {p?.description?.substring(0, 60)} ...
        </Typography>
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          component={Link}
          to={`/product/${p._id}`}
          size="small"
          variant="contained"
          color="secondary"
          sx={{ bgcolor: "#FFD700", "&:hover": { bgcolor: "darkpink" },color: "black"}}
        >
          Read More
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Button>

        <IconButton
          color="primary"
          onClick={() => addToCartHandler(p, 1)}
          sx={{ color: "orange" }}
        >
          <AiOutlineShoppingCart size={25} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
