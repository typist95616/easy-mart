import "./AddressListPage.scss";
import { useAddress } from "@/app/Context/AddressQuery";
import SingleAddressCard from "./SingleAddressCard";
import { Address } from "@/app/types/Address";
import addIcon from "../../../public/images/addressListPage-add.png";
import Image from "next/image";
import { useEffect } from "react";

interface addressListPageProps {
    setCurrentPage: (page: number) => void;
}

export default function AddressListPage(props: addressListPageProps) {

    const { addressList, currentAddress, setCurrentAddress } = useAddress();

    useEffect(() => {
        if (currentAddress != null) {
            setCurrentAddress(currentAddress);
        } else if (addressList) {
            setCurrentAddress(addressList[0]);
        }
    }, [])
    
    return (
        <div className="addressListPage-root">
            {addressList!.map((address => (
                <SingleAddressCard address={address} setCurrentPage={props.setCurrentPage}/>
            )))}
            <div className="addressListPage-addAddressButton" onClick={() => props.setCurrentPage(2)}>
                <Image src={addIcon} alt="add Icon" className="addressListPage-addAddressButton-image"></Image>
                <div className="addressListPage-addAddressButton-text">Add Address</div>
            </div>
        </div>
    )
}