// import React from 'react';

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/dashboard.css";
import TypeIt from "typeit-react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
// import food from "../asset/food.png";
// import cook from "../../public/asset/cook.png";
// import outlet from "../../public/asset/outlet.png"

const SuperStrong = ({ children }) => {
  return <strong style={{ fontSize: "3.5em", color: 'white' }}>{children}</strong>;
};

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("error fetching products", error);
    }
  };

  return (
    <div>
      {/* <section className='hero'>
            <div className='hero-body'>
            <div className="h1">
              <Card>
                <CardContent>
                  <TypeIt as={"h2"}>
                    <SuperStrong>Selamat Datang di CULINARIS</SuperStrong>
                    </TypeIt>  
                </CardContent>
              </Card>
            </div>
              <div className='container'>
              </div>
            </div>
          </section> */}
      <div className="hero">
        <Card
          sx={{
            backgroundColor: "#FFD300",
          }}
        >
          <CardContent sx={{margin: '20px 70px'}}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6} sx={{ textAlign: { xs: "center", md: "left" } }}>
                <TypeIt as={"h2"}>
                  <SuperStrong>
                    Selamat Datang di{" "}
                    <span style={{ fontFamily: 'Wittgenstein'  }}>CULINARIS</span> Website
                    Restaurant.
                  </SuperStrong>
                </TypeIt>
              </Grid>
              <Grid item xs={12} md={6} sx={{ textAlign: { xs: "center", md: "right" } }}>
                <img src={"/cook.png"} height={'250'} width={250} alt="cook" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>

      {/* <div>
        <Card sx={{m: 3, background: '#F5F7F8'}}>
          <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Box>
              <img src={"/outlet.png"} height={'200'} width={180} alt="outlet" style={{backgroundColor: 'white', m: 3}}/>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={'bold'}>
                Tentang Culinaris
              </Typography>
              <Typography variant="body2">
                Didirikan di Kota Bogor pada tahun 2022. 
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </div> */}

      <div className="App">
        <Box justifyContent={"center"} sx={{ mb: 4}}>
          <Box>
            <Typography variant="h4" fontWeight={"bold"} align="center" sx={{pt: 5}}>
              <Divider>Menu</Divider>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "30px",
              mt: 5,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {products.map((product) => (
              <Card
                key={product.id}
                sx={{
                  p: 1,
                  boxShadow: "2px 4px 8px 4px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "4px -6px 16px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardContent>
                  <img
                    src={"/food.png"}
                    height={150}
                    width={150}
                    alt="menu"
                    style={{
                      opacity: 0.3,
                      backgroundColor: "#FFA500",
                      padding: "4px",
                      borderRadius: "4px",
                    }}
                  />
                  <Typography variant="h6" gutterBottom fontWeight={"bold"}>
                    {product.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    fontWeight={"bold"}
                    sx={{
                      color: "white",
                      backgroundColor: "#FFA500",
                      padding: "4px",
                      borderRadius: "4px",
                    }}
                  >
                    Rp. {product.price}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* <div className='content'>
              <img src={bakso} height={150} width={150} />
            </div> */}
        {/* <div className='content'>
              <img src={image} height={200} width={200} />
            </div>
            <div className='content'>
              <img src={image} height={200} width={200} />
            </div> */}
      </div>
    </div>
  );
};
// }

export default Dashboard;

// <h1 className='title'>{heading}</h1>
{
  /* <div className='is-two-thirds column is-paddingless'>
    <p className='subtitle is-4'>{subheading}</p>
</div> */
}
{
  /* <a className='button is-large is-primary' id='learn'>learn</a> */
}
// import video from '../style/asset/videodashboard.mp4'
// import { MdCardGiftcard } from 'react-icons/md';

// const Dashboard  = () => {
//   render(){
//     let heading = "Welcome"
//     let subheading = "lorem ipsum dolor sit amet, consectetur adipiscing"
//     return (
//       <div>
//         HOME
//     </div>

// <div className="cardDashboard">
//     <div className='rightCard'>
//         {/* <h1>Selamat Datang!</h1>
//         <p>hahahahahaahahhaha</p> */}
//         </div>

//         <div className='videoDiv'>
//             <video src={video} autoPlay loop muted></video>
//         </div>
//     </div>

//     <card>
//         <h1>Selamat Datang!</h1>
//     </card>
//     )
//   }
// }
