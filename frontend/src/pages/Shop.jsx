import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

import {
  Box,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
  FormControl,
  FormGroup,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Shop = () => {
  const dispatch = useDispatch();
  const theme = useTheme(); // Use theme for dynamic styling
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <Box sx={{ bgcolor: "matteblack", color: "white", minHeight: "100vh", py: 4,marginTop:"30px" }}>
      <Grid container spacing={3}>
        {/* Filters Section */}
        <Grid item xs={12} md={3}>
          <Box sx={{ p: 7, bgcolor: theme.palette.grey[900], borderRadius: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Filter by Categories
            </Typography>

            <FormControl component="fieldset" sx={{ mb: 4 }}>
              <FormGroup>
                {categories?.map((c) => (
                  <FormControlLabel
                    key={c._id}
                    control={
                      <Checkbox
                        onChange={(e) => handleCheck(e.target.checked, c._id)}
                        sx={{ color: "yellow" }}
                      />
                    }
                    label={c.name}
                    sx={{ color: "white" }}
                  />
                ))}
              </FormGroup>
            </FormControl>

            <Typography variant="h5" align="center" gutterBottom>
              Filter by Brands
            </Typography>

            <FormControl component="fieldset" sx={{ mb: 4 }}>
              <RadioGroup name="brand">
                {uniqueBrands?.map((brand) => (
                  <FormControlLabel
                    key={brand}
                    value={brand}
                    control={<Radio sx={{ color: "yellow" }} />}
                    label={brand}
                    onChange={() => handleBrandClick(brand)}
                    sx={{ color: "white" }}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Typography variant="h5" align="center" gutterBottom>
              Filter by Price
            </Typography>

            <TextField
              variant="outlined"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              fullWidth
              sx={{
                input: { color: "white" },
                bgcolor: theme.palette.grey[800],
                mb: 4,
                borderRadius: 1,
              }}
            />

            <Button
            sx={{backgroundColor:"#FFD700",color: "black",fontWeight:"bold"}}
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => window.location.reload()}
            >
              Reset
            </Button>
          </Box>
        </Grid>

        {/* Products Section */}
        <Grid item xs={12} md={9}>
          <Typography variant="h5" align="center" sx={{ mb: 3 }}>
            {products?.length} Products
          </Typography>

          <Grid container spacing={3}>
            {products.length === 0 ? (
              <Loader />
            ) : (
              products?.map((p) => (
                <Grid item xs={12} sm={6} md={3} key={p._id}>
                  <ProductCard p={p} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Shop;
