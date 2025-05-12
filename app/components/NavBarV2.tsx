import "./NavBarV2.scss";
import easyMartLogo from "../../public/images/easyMartLogo.png";
import Image from "next/image";
import NavBarLocation from "../components/NavBarComponent/NavBarLocation";
import SearchBar from "../components/NavBarComponent/NavBarSearchBar";
import CartButton from "../components/NavBarComponent/NavBarCartButton";
import LoginButton from "../components/NavBarComponent/NavBarLoginButton";
import clsx from "clsx";
import { useState } from "react";

export default function NavbarV2() {

    const [searchActive, setSearchActive] = useState(false);

    return <div className="whole-navbar-v2">
        <div className={`top-navbar${searchActive ? " hide" : ""}`}>
            <Image src={easyMartLogo} alt="logo" className="easyMartLogo"></Image>
            <div className="top-navbar-spacer"></div>
            <NavBarLocation></NavBarLocation>
            <div className="top-navbar-searchBar-leftSpacer"></div>
            <SearchBar className={clsx("top-searchBar")} searchActive={searchActive} setSearchActive={setSearchActive}/>
            <div className="top-navbar-searchBar-rightSpacer"></div>
            <div className="RightNavItems">
                <CartButton></CartButton>
                <div className="top-navbar-spacer"></div>
                <LoginButton></LoginButton>
            </div>
        </div>
        <div className="bottom-navbar">
            <SearchBar className={clsx("bottom-searchBar")} searchActive={searchActive} setSearchActive={setSearchActive}></SearchBar>
        </div>
    </div>
}