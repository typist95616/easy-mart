import easyMartLogo from "../images/easyMartLogo.png";
import locationIcon from "../images/Location.png";
import searchIcon from "../images/search.png";
import cartIcon from "../images/cart.png";
import loginIcon from "../images/login.png";
import Image from "next/image";
import React from "react";
import "./navbar.css";

export default function Navbar() {
return (
    <div className="whole-navbar">
        <Image src={easyMartLogo} alt="easyMart-icon" className="navbar-icon"></Image>
        <div className="navbar-location">
            <Image src={locationIcon} alt="navbar-location-icon"></Image>
            <div className="navbar-location-text">10115 New York</div>
        </div>
        <div className="navbar-spacer-left"></div>
        <div className="navbar-searchbar">
            <Image src={searchIcon} alt="navbar-searchbar-icon" className="navbar-searchbar-icon"></Image>
            <input placeholder="Search by" className="navbar-searchbar-input"></input>
        </div>
        <div className="navbar-spacer-right"></div>
        <div className="navbar-cart">
            <div className="navbar-cart-logoItem">
                <Image src={cartIcon} alt="cart-logo" className="navbar-cart-logo"></Image>
                <label className="navbar-cart-item">14</label>
            </div>
            <label className="navbar-cart-text">Cart</label>
        </div>
        <div className="navbar-loginButton">
            <Image src={loginIcon} alt="loginButton-icon" className="navbar-login-icon"></Image>
            <label className="navbar-login-text">Login</label>
        </div>
    </div>
)
}