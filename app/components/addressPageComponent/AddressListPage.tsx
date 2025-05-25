import "./AddressListPage.scss";
import { useAddress } from "@/app/Context/AddressContext";
import SingleAddressCard from "./SingleAddressCard";
import { Address } from "@/app/types/Address";
import addIcon from "../../../public/images/addressListPage-add.png";
import Image from "next/image";

interface addressListPageProps {
    setCurrentPage: (page: number) => void;
    currentAddress: Address | undefined;
}

export default function AddressListPage(props: addressListPageProps) {

    const { addressList } = useAddress();
    
    return (
        <div className="addressListPage-root">
            {addressList.map((address => (
                <SingleAddressCard address={address} currentAddress={props.currentAddress} setCurrentPage={props.setCurrentPage}/>
            )))}
            <div className="addressListPage-addAddressButton" onClick={() => props.setCurrentPage(2)}>
                <Image src={addIcon} alt="add Icon" className="addressListPage-addAddressButton-image"></Image>
                <div className="addressListPage-addAddressButton-text">Add Address</div>
            </div>
        </div>
    )
}