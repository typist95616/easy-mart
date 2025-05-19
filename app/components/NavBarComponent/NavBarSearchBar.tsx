"use client";

import "./NavBarSearchBar.scss";
import searchIcon from "../../../public/images/search.png";
import Image from "next/image";
import DropDownItem from "../dropdownItem"
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Product } from "@/app/types/Product";

interface NavBarSearchBarProps {
    className?: string;
    searchActive: boolean;
    setSearchActive: (active: boolean) => void;
    onSearch?: (searchTerm: string) => void;
}

export default function NavBarSearchBar(props: NavBarSearchBarProps) {

    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    
    // Refer to Input in searchBar
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if(inputValue.trim() === "") {
                setSuggestions([]);
                return;
            }
            const res = await fetch(`/api/products/search?searchText=` + inputValue);
            const data = await res.json();
            setSuggestions(data);
        }
        fetchSuggestions();
    }, [inputValue]);

    return (
        <div className={clsx("navbar-searchbar-root", props.className)}>
            <Image src={searchIcon} alt="navbar-searchbar-icon" className="navbar-searchbar-icon"></Image>
            <input
                placeholder="Search by"
                className="navbar-searchbar-input"
                onFocus={() => props.setSearchActive(true)}
                onBlur={() => props.setSearchActive(false)}
                onChange={e => {setInputValue(e.target.value)}}
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        const value = (e.target as HTMLInputElement).value; 
                        props.onSearch && props.onSearch(value);
                        props.setSearchActive(false); // hide the drop down menu after the page refresh with search result
                        inputRef.current?.blur(); // Set input to blur after direct to searchResult
                    }
                }}
                >
            </input>

            {/* Search bar Dropdown menu */}
            {props.searchActive && suggestions.length > 0 && (
                <div className="whole-dropdown">
                    {suggestions.map((Product, index) => (
                        <DropDownItem index={index} product={Product}></DropDownItem>
                    ))}
                </div>
            )}
        </div>
    )
}