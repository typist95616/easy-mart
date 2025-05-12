import "./NavBarSearchBar.scss";
import searchIcon from "../../../public/images/search.png";
import Image from "next/image";
import { useState } from "react";
import DropDownItem from "../dropdownItem"
import clsx from "clsx";

interface NavBarSearchBarProps {
    className?: string;
    searchActive: boolean;
    setSearchActive: (active: boolean) => void;
}

export default function NavBarSearchBar(props: NavBarSearchBarProps) {

    return (
        <div className={clsx("navbar-searchbar-root", props.className)}>
            <Image src={searchIcon} alt="navbar-searchbar-icon" className="navbar-searchbar-icon"></Image>
            <input
                placeholder="Search by"
                className="navbar-searchbar-input"
                onFocus={() => props.setSearchActive(true)}
                onBlur={() => props.setSearchActive(false)}>
            </input>

            {/* Search bar Dropdown menu */}
            {props.searchActive && (
                <div className="whole-dropdown">
                    <DropDownItem index={0} />
                    <DropDownItem index={1} />
                    <DropDownItem index={2} />
                </div>
            )}
        </div>
    )
}