import "./AddressInputPage.scss"
import Image from "next/image";
import searchIcon from "../../../public/images/search.png";
import { useState } from "react";

interface AddressInputPageProps {
    setCurrentPage: (page: number) => void;
}

export default function AddressInputPage(props: AddressInputPageProps) {

    const [searchActive, setSearchActive] = useState(false);

    return (
        <div className="addressInputPage-root">
            <div className="addressInputPage-addressSearchBar">
                <Image src={searchIcon} alt="search-Icon" className="addressInputPage-addressSearchBar-searchIcon"></Image>
                <input
                    placeholder="Enter your address"
                    className="addressInputPage-addressSearchBar-input"
                    onFocus={() => setSearchActive(true)}
                    onBlur={() => setSearchActive(false)}
                >
                </input>

                {/* Search bar Dropdown menu */}
                {searchActive && (
                    <div className="addressInputPage-whole-dropdown">
                        <div>Items</div>
                    </div>
                )}
            </div>

            <div onClick={() => props.setCurrentPage(1)}>previous page</div>
            <div onClick={() => props.setCurrentPage(3)}>next page</div>
        </div>
    )
}