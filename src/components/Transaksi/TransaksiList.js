import React , {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import "../../style/main.css";
import { Container, Grid, Button, TextField, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import {FaSearch} from "react-icons/fa";

const TransaksiList = () => {
    //  untuk menyimpan data transaksi, tanggal pencarian, dan produk.
    const [transaksis, setTransaksi] = useState([]);
    const [products, setProduct] = useState([]);
    const [searchDate, setSearchDate] = useState("");

    // const [searchQuery, setSearchQuery] = useState([]);

    // menjalankan function getTransaksis
    useEffect(() => {
        getTransaksis();
        getProducts()
    }, []);

    // method untuk fetch datanya
    const getTransaksis = async () => {
        const response = await axios.get('http://localhost:5000/transaksis')
        setTransaksi(response.data);
    }

    const deleteTransaksi = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/transaksis/${id}`);
            getTransaksis();
        } catch (err) {
            console.log(err);
        }
    }

    // productId : nyimpen id produk yg dicari
    // (product) => product.id === productId, ngebandingin ID setiap produk dengan ID yang diberikan sebagai parameter
    const getProductNameById = (productId) => {
        const product = products.find((product) => product.id === productId);
        // ngembaliin nama produk kalo produk dengan ID tersebut ditemukan (product ? product.name)
        // tapi kalo tidak ada produk dengan ID tersebut, munculin string "Product not found".
        return product ? product.name : "Product not found";
    }

    const getProductPriceById = (productId) => {
        const product = products.find((product) => product.id === productId);
        return product ? product.price : 0;
    }

    const getProducts = async () => {
        const response = await axios.get('http://localhost:5000/products')
        // mengubah state sesuai dengan responsnya.
        setProduct(response.data);
    }

    const handleSearch = () => {
        const filteredTransaksis = transaksis.filter((transaksi) =>
        // ambil tanggal transaksi terus diubah jadi lowercase jadi searchnya bersifat case-insensitive
        // cari apakah tanggal yang dicari ada di dalam tanggal transaksi yang udah diuah jadi lowercase tadi
          transaksi.order_date.toLowerCase().includes(searchDate.toLowerCase())
        );
        setTransaksi(filteredTransaksis);
      };

      const handleClear = () => {
        window.location.reload();
    };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
              type="date"
              variant="outlined"
              size="small"
              placeholder="Search by date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              sx={{ mr: 2 }}
            />
            <Button variant="contained" color="info" onClick={handleSearch}>
              Cari
            </Button>
            <Button variant="contained" color="warning" onClick={handleClear} sx={{ ml: 2 }}>
              Clear
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Link to="/transaksi/add">
            <Button variant="contained" color="success">
              Tambah Transaksi
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Table sx={{mb: 2}}>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>No</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Produk</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Tanggal Transaksi</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Qty</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Total</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transaksis.map((transaksi, index) => (
                <TableRow key={transaksi.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{getProductNameById(transaksi.products_id)}</TableCell>
                  <TableCell>{transaksi.order_date}</TableCell>
                  <TableCell>{transaksi.quantity}</TableCell>
                  <TableCell>{getProductPriceById(transaksi.products_id) * transaksi.quantity}</TableCell>
                  <TableCell>
                    <Button
                        component={Link}
                        to={`/transaksi/edit/${transaksi.id}`}
                        variant="contained"
                        color="info"
                        size="small"
                        sx={{ m: 0.5 }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ m: 0.5 }}
                        onClick={() => deleteTransaksi(transaksi.id)}
                    >
                        Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Container>
  )
}


export default TransaksiList;