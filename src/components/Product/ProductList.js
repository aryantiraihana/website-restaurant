import React , {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import "../../style/main.css";
import {
    Container,
    Box,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Typography
  } from '@mui/material';

const ProductList = () => {
    // state baru namanya products
    // setProduct = fungsi untuk update State
    // value useState itu empty array ([])
    // Ini mendeklarasikan state products dengan menggunakan useState, yang awalnya diatur sebagai array kosong [].
    // setProduct adalah fungsi yang digunakan untuk memperbarui nilai dari state products.
    const [products, setProduct] = useState([]);

    // menjalankan function getProducts
    useEffect(() => {
        getProducts();
    }, []);

    // method untuk fetch datanya
    const getProducts = async () => {
        // Data yang diterima dari server kemudian diset sebagai nilai state products
        const response = await axios.get('http://localhost:5000/products')
        setProduct(response.data)
    }

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/products/${id}`);
            getProducts();
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box display="flex"  mb={2}>
        <Button
          component={Link}
          to="/product/add"
          variant="contained"
          color="success"
        >
          Tambah Menu
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>No</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Nama Produk</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Harga</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <Button
                  component={Link}
                  to={`/product/edit/${product.id}`}
                  variant="contained"
                  color="info"
                  size="small"
                  sx={{ m: 0.5 }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteProduct(product.id)}
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ m: 0.5 }}
                >
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  )
}

export default ProductList;
