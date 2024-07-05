import React, {useState, useEffect} from 'react';
// import axios krn kita akan berinteraksi dgn api
import axios from "axios";
import { useNavigate, Link} from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { Container, Grid, Button, TextField, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { MdAddShoppingCart, MdArrowBackIosNew } from "react-icons/md";




const AddTransaksi = () => {
    const [products_id, setProductsId] = useState("");
    const [order_date, setOrderDate] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [products, setProduct] = useState([]);

    const [orders, setOrders] = useState([
        { products_id: "", order_date: "", quantity: 1 }
      ]);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        try{
            const response = await axios.get('http://localhost:5000/products');
            setProduct(response.data);
        } catch(err){
            console.log(err);
        }
    }   

    const handleOrderChange = (index, field, value) => {
        // Membuat salinan baru dari array orders menggunakan spread operator [...orders]
        const newOrders = [...orders];
        newOrders[index][field] = value;
        setOrders(newOrders);
      };
    
      const addOrder = () => {
        // untuk menambahkan pesanan baru ke dalam array orders
        // menambahkan objek pesanan baru dengan nilai awal ke array tersebut
        // atur state orders dengan array pesanan yang baru
        setOrders([...orders, { products_id: '', quantity: 1 }]);
      };
    
      const removeOrder = (index) => {
        // Membuat salinan baru dari array orders menggunakan spread operator [...orders]
        // splice untuk menghapus satu elemen pada indeks yang diberikan.
        // atur state orders dengan array pesanan yang diperbarui setelah penghapusan.
        const newOrders = [...orders];
        newOrders.splice(index, 1);
        setOrders(newOrders);
      };

const saveTransaksi = async (e) => {
    // prevent default agar ketika disubmit, page tdk reload
    e.preventDefault();
    try{
        await axios.post('http://localhost:5000/transaksis', orders);
        // redirect
        navigate("/transaksi");
    }catch(err){
        console.log(err);
    }
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
        <Box component="form" onSubmit={saveTransaksi} noValidate autoComplete="off">
          <Grid container spacing={2}>
            {orders.map((order, index) => (
              <Grid item xs={12} key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel>Pilih Menu</InputLabel>
                      <Select
                        value={order.products_id}
                        onChange={(e) => handleOrderChange(index, 'products_id', e.target.value)}
                        label="Pilih Menu"
                      >
                        <MenuItem value="" disabled>
                          Pilih Menu
                        </MenuItem>
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
                      value={order.quantity}
                      onChange={(e) => handleOrderChange(index, 'quantity', e.target.value)}
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
                      value={order.order_date}
                      onChange={(e) => handleOrderChange(index, 'order_date', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="button"
                      onClick={() => removeOrder(index)}
                      variant="contained"
                      color="error"
                      startIcon={<FaTrashAlt />}
                      fullWidth
                    >
                      Hapus
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                type="button"
                onClick={addOrder}
                variant="contained"
                color="info"
                startIcon={<MdAddShoppingCart />}
                fullWidth
              >
                Tambah Order
              </Button>
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
  );
}

export default AddTransaksi;