import React, {useState, useEffect} from 'react';
// import axios krn kita akan berinteraksi dgn api
import axios from "axios";
import { useNavigate , useParams, Link} from 'react-router-dom';
import { Container, Grid, Button, TextField, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { MdArrowBackIosNew } from "react-icons/md";

const EditTransaksi = () => {
    const [products_id, setProductsId] = useState("");
    const [order_date, setOrderDate] = useState("");
    const [quantity, setQuantity] = useState("");
    const [products, setProduct] = useState([]);
    const navigate = useNavigate();
    // untuk mengambil value dari parameter id
    const {id} = useParams();

    useEffect(() => {
        getTransaksiById();
        getProducts();
    }, [])

const updateTransaksi = async (e) => {
    // prevent default agar ketika disubmit, page tdk reload
    e.preventDefault();
    try{
        await axios.patch(`http://localhost:5000/transaksis/${id}`, {
            products_id, 
            order_date,
            quantity
        });
        // redirect
        navigate("/transaksi");
    }catch(err){
        console.log(err);
    }
}

    const getProducts = async () => {
        try{
            const response = await axios.get('http://localhost:5000/products');
            setProduct(response.data);
        } catch(err){
            console.log(err);
        }
    }

    //method untuk mengambil single data
    const getTransaksiById = async () => {
        const response = await axios.get(`http://localhost:5000/transaksis/${id}`);
        setProductsId(response.data.products_id);
        setOrderDate(response.data.order_date);
        setQuantity(response.data.quantity);
    }



  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Link to="/transaksi">
            <Button variant="contained" color="warning" startIcon={<MdArrowBackIosNew />} sx={{ mb: 4 }}>
              
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Box component="form" onSubmit={updateTransaksi} noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel>Pilih Menu</InputLabel>
                  <Select
                    value={products_id}
                    onChange={(e) => setProductsId(e.target.value)}
                    label="Pilih Menu"
                  >
                    <MenuItem value="" disabled></MenuItem>
                    {products.map((product) => (
                      <MenuItem key={product.id} value={product.id}>
                        {product.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  variant="outlined"
                  label="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Masukan Jumlah Menu..."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  variant="outlined"
                  label="Tanggal Transaksi"
                  value={order_date}
                  onChange={(e) => setOrderDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  placeholder="Masukan Tanggal Transaksi..."
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="success" fullWidth>
                  Simpan
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default EditTransaksi;
