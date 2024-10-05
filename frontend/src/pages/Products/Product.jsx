import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <Card
      sx={{
        width: 250,
        height: 300,
        marginLeft: 2,
        position: "relative",
        backgroundColor: "#FFD700",
        mb: "30px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {product.images && product.images.length > 0 && (
        <CardMedia
          component="img"
          height="200" // Fixed height for uniformity
          image={product.images[0]}
          alt={product.name}
          sx={{
            borderRadius: 1,
            objectFit: "cover", // Maintain aspect ratio
            height:"200px"
          }}
        />
      )}
      <HeartIcon product={product} />
      <Link
          to={`/product/${product._id}`}
          style={{ textDecoration: "none", color: "white", flexGrow: 1 }}
        >
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: "block", 
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              maxWidth: "100%",
              fontSize: "0.875rem",
              color:"black",
              fontWeight: "bold", 
            }}
          >
            {product.name}
          </Typography>
      
        <span
          style={{
            backgroundColor: "black",
            color: "yellow",
            fontWeight: "bold",
            padding: "2.5px 5px",
            borderRadius: "25px",
            fontSize: "1.075rem",
            marginTop: "8px", 
            maxWidth: "50%",
            display: "inline-block", 
            textAlign: "center", 
            alignSelf: "flex-start", 
          }}
        >
          ₹{product.price || "N/A"}
        </span>
       
      </CardContent>
      </Link>
    </Card>
  );
};

export default Product;
