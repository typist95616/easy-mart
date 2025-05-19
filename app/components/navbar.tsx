import easyMartLogo from "../images/easyMartLogo.png";
import locationIcon from "../../public/images/location.svg";
import searchIcon from "../images/search.png";
import cartIcon from "../images/cart.svg";
import loginIcon from "../images/login.png";
import menuIcon from "../../public/images/menu.svg";
import NavbarCart from "./navbarCart";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DropDownItem from "./dropdownItem"
import "./navbar.css";
import Link from "next/link";


export default function Navbar() {

    const [searchActive, setSearchActive] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1000);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (isMobile) {
        return (
            <div className="whole-navbar">
                <div className={`navbar-firstLine${searchActive ? " hide" : ""}`}>
                <Image src={easyMartLogo} alt="easyMart-icon" className="navbar-icon" />                    
                    <div className="navbar-spacer"></div>
                    <div className="navbar-location">
                        <Image src={locationIcon} alt="location Icon"></Image>
                        <div className="navbar-location-text">10115 New York</div>
                    </div>
                    <div className="navbar-spacer"></div>
                    <NavbarCart />
                    <Link href={"/pages/login"}>
                        <div className="navbar-loginButton">
                            <Image src={loginIcon} alt="loginButton-icon" className="navbar-login-icon" width={16} height={16}></Image>
                        </div>
                    </Link>
                    <div className="navbar-firstLine-spacer"></div>
                </div>
                <div className="navbar-secondLine">
                    <div className="navbar-searchbar">
                        <input
                            placeholder="   Search by product name"
                            className="navbar-searchbar-input"
                            onFocus={() => setSearchActive(true)}
                            onBlur={() => setSearchActive(false)}>
                        </input>
                        <Image src={searchIcon} alt="navbar-searchbar-icon" className="navbar-searchbar-icon"></Image>
                        {searchActive && (
                            <div></div>
                            // <div className="whole-dropdown">
                            //     <DropDownItem index={0} />
                            //     <DropDownItem index={1} />
                            //     <DropDownItem index={2} />
                        )}
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="whole-navbar">
                <Link href="/pages/main">
                    <Image src={easyMartLogo} alt="easyMart-icon" className="navbar-icon" />
                </Link>
                <div className="navbar-spacer"></div>
                <div className="navbar-location">
                    <Image src={locationIcon} alt="location Icon"></Image>
                    <div className="navbar-location-text">10115 New York</div>
                </div>
                <div className="navbar-spacer-left"></div>
                <div className="navbar-searchbar">
                    <Image src={searchIcon} alt="navbar-searchbar-icon" className="navbar-searchbar-icon"></Image>
                    <input
                        placeholder="Search by"
                        className="navbar-searchbar-input"
                        onFocus={() => setSearchActive(true)}
                        onBlur={() => setSearchActive(false)}>
                    </input>

                    {/* Search bar Dropdown menu */}
                    {searchActive && (
                        <div className="whole-dropdown">
                            {/* <DropDownItem index={0} />
                            <DropDownItem index={1} />
                            <DropDownItem index={2} /> */}
                        </div>
                    )}
                </div>

                <div className="navbar-spacer-right"></div>
                <NavbarCart />
                <Link href={"/pages/login"}>
                    <div className="navbar-loginButton">
                        <Image src={loginIcon} alt="loginButton-icon" className="navbar-login-icon" width={16} height={16}></Image>
                        <label className="navbar-login-text">Login</label>
                    </div>
                </Link>

            </div>
        )
    }
}