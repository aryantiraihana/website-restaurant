import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";

// Product
import ProductList from "./components/Product/ProductList";
import AddProduct from "./components/Product/AddProduct";
import EditProduct from "./components/Product/EditProduct";

// Transaksi
import TransaksiList from "./components/Transaksi/TransaksiList";
import AddTransaksi from "./components/Transaksi/AddTransaksi";
import EditTransaksi from "./components/Transaksi/EditTransaksi";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Dashboard/>} />

          <Route path="/product" element={<ProductList/>} />
          <Route path="/product/add" element={<AddProduct/>} />
          <Route path="/product/edit/:id" element={<EditProduct/>} />

          <Route path="/transaksi" element={<TransaksiList/>} />
          <Route path="/transaksi/add" element={<AddTransaksi/>} />
          <Route path="/transaksi/edit/:id" element={<EditTransaksi/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
