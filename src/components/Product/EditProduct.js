// untuk mengelola state di komponen fungsional React.
import React, {useState, useEffect} from 'react';
// import axios krn kita akan berinteraksi dgn api
import axios from "axios";
// useParams digunakan untuk mengambil nilai dari parameter URL
import { useNavigate , useParams, Link} from 'react-router-dom';
import { MdArrowBackIosNew } from "react-icons/md";
import { Container, Box, TextField, Button, Typography, Grid } from '@mui/material';

const EditProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();

    // untuk mengambil value/nilai dari parameter id yang ada di dalam URL (di router)
    const {id} = useParams();

    useEffect(() => {
        getProductById();
    }, [])

const updateProduct = async (e) => {
    // prevent default agar ketika disubmit, page tdk reload
    e.preventDefault();
    try{
        // melakukan permintaan patch ke "http..." untuk update
        await axios.patch(`http://localhost:5000/products/${id}`, {
            name, 
            price
        });
        // redirect
        navigate("/product");
    }catch(err){
        console.log(err);
    }
}

    //method untuk mengambil single data
    const getProductById = async () => {
        // nilai dari parameter id yang diambil menggunakan useParams.
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setName(response.data.name);
        setPrice(response.data.price);
    }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <Link to="/product">
            <Button variant="contained" color="warning" startIcon={<MdArrowBackIosNew />} sx={{ mb: 4 }} />
            </Link>
        </Grid>
        <Grid item xs={12}>
            <Box component="form" onSubmit={updateProduct} noValidate autoComplete="off">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    size='small'
                    label="Menu"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    size='small'
                    label="Harga"
                    type="number"
                    variant="outlined"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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

export default EditProduct;
