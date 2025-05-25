import "./AddressInputPage.scss"
import Image from "next/image";
import searchIcon from "../../../public/images/search.png";
import { useEffect, useState } from "react";
import SingleSuggestion from "./SingleSuggestion";
import { Address } from "@/app/types/Address";

interface AddressInputPageProps {
    setCurrentPage: (page: number) => void;
}

export default function AddressInputPage(props: AddressInputPageProps) {

    const [searchActive, setSearchActive] = useState(false);

    const [input, setInput] = useState("");
    const [addresses, setAddresses] = useState<Address[]>([]);

    useEffect(() => {
        if (input.length < 3) {
            setAddresses([]);
          return;
        }
        const timeout = setTimeout(() => {
          fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&limit=4&addressdetails=1`)
            .then(res => res.json())
            .then(data => {
                data = data.map((address: any) => {
                    return {
                        ...address,
                        ...address.address
                    }})
                setAddresses(data);
            });
        }, 300);
        return () => clearTimeout(timeout);
      }, [input]);

    return (
        <div className="addressInputPage-root">
            <div onClick={() => props.setCurrentPage(3)}>next page</div>
            <div className="addressInputPage-addressSearchBar">
                <Image src={searchIcon} alt="search-Icon" className="addressInputPage-addressSearchBar-searchIcon"></Image>
                <input
                    placeholder="Enter your address"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="addressInputPage-addressSearchBar-input"
                    onFocus={() => setSearchActive(true)}
                    onBlur={() => setSearchActive(false)}
                >
                </input>

                {/* Search bar Dropdown menu */}
                {searchActive && addresses.length > 0 && (
                    <div className="addressInputPage-whole-dropdown">
                        {addresses.map(item => (
                            <div>
                                <SingleSuggestion address={item} setCurrentPage={props.setCurrentPage}></SingleSuggestion>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}