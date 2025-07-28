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
import PopupWindow from "./addressPageComponent/PopupWindow";
import LogoutButton from "../components/NavBarComponent/NavBarLogoutButton"
import { useTokenAtom } from "../Context/TokenAtom";

interface NavBarV2Props {
    className?: string;
}

export default function NavbarV2(props: NavBarV2Props) {

    const [searchActive, setSearchActive] = useState(false);

    const [isLocationPopupOpen, setIsLocationPopupOpen] = useState(false);

    const router = useRouter();

    const { token } = useTokenAtom();


    const handleSearch = (searchTerm: string) => {
        if (searchTerm.trim()) {
            router.push(`/pages/searchResult?query=${encodeURIComponent(searchTerm)}`);
        }
    }

    const handleLocationPage = () => {
        if (window.innerWidth >= 600) {
            setIsLocationPopupOpen(!isLocationPopupOpen);
        } else {
            router.push("/pages/address");
        }
    }

    return (
        <div className={clsx(props.className)}>
            <div className={`top-navbar${searchActive ? " hide" : ""}`}>
                <Link href="/pages/main">
                    <Image src={easyMartLogo} alt="logo" className="easyMartLogo"></Image>
                </Link>
                <NavBarLocation onClick={handleLocationPage}></NavBarLocation>
                <div className="top-navbar-searchBar-leftSpacer"></div>
                <SearchBar className={clsx("top-searchBar")} searchActive={searchActive} setSearchActive={setSearchActive} onSearch={handleSearch} />
                <div className="top-navbar-searchBar-rightSpacer"></div>
                <div className="RightNavItems">
                    <CartButton></CartButton>
                    {/* {token && (
                        <>
                            <UserName></UserName>
                        </>
                    )} */}
                    <div className="top-navbar-spacer"></div>
                    {token ? (
                        <LogoutButton></LogoutButton>
                    ) : (
                        <>
                            <Link href="/pages/login">
                                <LoginButton></LoginButton>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className="bottom-navbar">
                <SearchBar className={clsx("bottom-searchBar")} searchActive={searchActive} setSearchActive={setSearchActive} onSearch={handleSearch}></SearchBar>
            </div>

            {/* Pop up windoow after location is clicked */}
            {isLocationPopupOpen && (
                <>
                    <div className="location-popup-overlay"></div>
                    <div className="location-popup-window">
                        <PopupWindow setIsLocationPopupOpen={setIsLocationPopupOpen}></PopupWindow>
                    </div>
                </>
            )}
        </div>
    )
}