import React, {useState} from 'react';
// import axios krn kita akan berinteraksi dgn api
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { Container, Grid, Button, TextField, Typography, Box } from '@mui/material';
import { MdArrowBackIosNew } from "react-icons/md";

const AddProduct = () => {
    // dua state (name dan price) diinisialisasi dengan nilai awal kosong menggunakan useState.
    // setName dan setPrice adalah fungsi yang digunakan untuk memperbarui nilai dari masing-masing state.
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    // untuk mendapatkan fungsi navigasi yang dapat digunakan untuk pindah halaman
    const navigate = useNavigate();

    //dijalankan saat formulir disubmit
const saveProduct = async (e) => {
    // prevent default agar ketika disubmit, page tdk reload
    e.preventDefault();
    try{
        // melakukan req post ke "http..." untuk menambah produk berdasrkan nilai name & price
        await axios.post('http://localhost:5000/products', {
            name, 
            price
        });
        // redirect
        navigate("/product");
    }catch(err){
        console.log(err);
    }
}

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Link to="/product">
            <Button
              variant="contained"
              color="warning"
              startIcon={<MdArrowBackIosNew />}
              sx={{ mb: 4 }}
            >
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Box component="form" onSubmit={saveProduct} noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Menu
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Menu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukan Nama Menu"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Harga
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Harga"
                  variant="outlined"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Masukan Harga Menu"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="success">
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

export default AddProduct;
