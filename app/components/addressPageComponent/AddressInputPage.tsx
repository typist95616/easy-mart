import "./AddressInputPage.scss"
import Image from "next/image";
import searchIcon from "../../../public/images/search.png";
import { useEffect, useState } from "react";
import locationIcon from "../../../public/images/suggestion-location.png";
import SingleSuggestion from "./SingleSuggestion";
import { Suggestion } from "@/app/types/Suggestion";

interface AddressInputPageProps {
    setCurrentPage: (page: number) => void;
    setCurrentSuggestion: (suggestion: Suggestion) => void;
}

export default function AddressInputPage(props: AddressInputPageProps) {

    const [searchActive, setSearchActive] = useState(false);

    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    useEffect(() => {
        if (input.length < 3) {
          setSuggestions([]);
          return;
        }
        const timeout = setTimeout(() => {
          fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&limit=4`)
            .then(res => res.json())
            .then(data => {
                setSuggestions(data);
            });
        }, 300);
        return () => clearTimeout(timeout);
      }, [input]);

    return (
        <div className="addressInputPage-root">
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
                {searchActive && suggestions.length > 0 && (
                    <div className="addressInputPage-whole-dropdown">
                        {suggestions.map(item => (
                            <div>
                                <SingleSuggestion suggestion={item} setCurrentPage={props.setCurrentPage} setCurrentSuggestion={props.setCurrentSuggestion}></SingleSuggestion>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}