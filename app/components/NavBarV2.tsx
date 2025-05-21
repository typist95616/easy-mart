"use client";

import "./NavBarV2.scss";
import easyMartLogo from "../../public/images/easyMartLogo.png";
import Image from "next/image";
import NavBarLocation from "../components/NavBarComponent/NavBarLocation";
import SearchBar from "../components/NavBarComponent/NavBarSearchBar";
import CartButton from "../components/NavBarComponent/NavBarCartButton";
import LoginButton from "../components/NavBarComponent/NavBarLoginButton";
import clsx from "clsx";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavBarV2Props {
    className?: string;
}

export default function NavbarV2(props: NavBarV2Props) {

    const [searchActive, setSearchActive] = useState(false);
    const router = useRouter();

    const handleSearch = (searchTerm: string) => {
        if (searchTerm.trim()) {
            router.push(`/pages/searchResult?query=${encodeURIComponent(searchTerm)}`);
        }
    }

    return <div className={clsx(props.className)}>
        <div className={`top-navbar${searchActive ? " hide" : ""}`}>
            <Link href="/pages/main">
                <Image src={easyMartLogo} alt="logo" className="easyMartLogo"></Image>
            </Link>
            {/* <div className="top-navbar-spacer"></div> */}
            <NavBarLocation></NavBarLocation>
            <div className="top-navbar-searchBar-leftSpacer"></div>
            <SearchBar className={clsx("top-searchBar")} searchActive={searchActive} setSearchActive={setSearchActive} onSearch={handleSearch}/>
            <div className="top-navbar-searchBar-rightSpacer"></div>
            <div className="RightNavItems">
                <CartButton></CartButton>
                <div className="top-navbar-spacer"></div>
                <Link href="/pages/login">
                    <LoginButton></LoginButton>
                </Link>
            </div>
        </div>
        <div className="bottom-navbar">
            <SearchBar className={clsx("bottom-searchBar")} searchActive={searchActive} setSearchActive={setSearchActive} onSearch={handleSearch}></SearchBar>
        </div>
    </div>
}