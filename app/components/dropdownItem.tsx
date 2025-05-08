import "./dropdownItem.css";
import Image from "next/image";
import orange from "../images/orange.png"

interface DropdownItemProp {
    index: number;
}

export default function DropdownItem({index}: DropdownItemProp) {

    const bgColorClass = index % 2 ===0 ? "dropdown-bg-grey" : "dropdown-bg-white";

    return (
        <div className={`dropDown-component ${bgColorClass}`}>
            <Image src={orange} alt="search image" className="dropdown-searchImage"/>
            <div className="dropdown-searchText">This is orange</div>
        </div>
    )
}