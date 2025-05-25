import "./SingleSuggestion.scss";
import location from "../../../public/images/suggestion-location.png";
import Image from "next/image";
import { Address } from "@/app/types/Address";
import { useAddress } from "@/app/Context/AddressContext";

interface singleSuggestionProps {
    address: Address;
    setCurrentPage: (page: number) => void;
}

export default function singleSuggestion(props: singleSuggestionProps) {

    const { setCurrentAddress } = useAddress();

    return (
        <div className="suggestion-root" onMouseDown={() => { props.setCurrentPage(3); setCurrentAddress(props.address)}}>
            <Image src={location} alt="location icon" className="suggestion-image"></Image>
            <div>{props.address.display_name}</div>
        </div>
    );
}