import React, {useRef} from 'react';
import {FaBars, FaTimes, FaHome} from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import "../style/main.css";

const Navbar = () => {

    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

  return (


    <header>
        {/* <h3>Logo</h3> */}
        <nav ref={navRef}>
            <p>CULINARIS</p>
            <a href="/"><FaHome /> Beranda </a>
            <a href="/product"><MdRestaurantMenu /> Daftar Menu </a>
            <a href="/transaksi"><GrMoney /> Data Transaksi </a>
            <button className="nav-btn nav-close-btn" onClick={showNavbar}> 
                <FaTimes/>
            </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
            <FaBars />
        </button>
    </header>
  );
}

export default Navbar
