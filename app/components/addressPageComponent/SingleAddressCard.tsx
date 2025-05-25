import { Address } from "@/app/types/Address";
import "./SingleAddressCard.scss";
import editIcon from "../../../public/images/edit.png";
import notSelctedIcon from "../../../public/images/notSelected.png";
import SelectedIcon from "../../../public/images/Selected.png";
import Image from "next/image";
import { useAddress } from "@/app/Context/AddressContext";

interface singleAddressCardProps {
    address: Address;
    setCurrentPage: (page: number) => void;
    currentAddress: Address | undefined;
}

export default function SingleAddressCard(props: singleAddressCardProps) {

    const { currentAddress, setCurrentAddress } = useAddress();

    return (
        <>
            <div className={ "singleAddressCard-root" + (currentAddress === props.address ? " selected" : "")} onClick={() => setCurrentAddress(props.address)}>
                <div className="singleAddressCard-left">
                    {currentAddress === props.address ? (
                        <Image src={SelectedIcon} alt="selected icon" className="singleAddressCard-selectIcon"></Image>
                     ) : (
                        <Image src={notSelctedIcon} alt="not selected icon" className="singleAddressCard-selectIcon"></Image>
                     )}
                    <div className="singleAddressCard-addressInfo">
                        <div className="singleAddressCard-addressInfo-addressName">{props.address.name}</div>
                        <div className="singleAddressCard-addressInfo-address"> {[props.address.roomNumber, props.address.building, props.address.village, props.address.city].filter(Boolean).join(", ")}</div>
                    </div>
                </div>
                <div className="singleAddressCard-editButton" onClick={() => props.setCurrentPage(4)}>
                    <Image src={editIcon} alt="edit icon" className="singleAddressCard-editButton-image"></Image>
                    <div className="singleAddressCard-editButton-text">Edit</div>
                </div>
            </div>
        </>

    )
}