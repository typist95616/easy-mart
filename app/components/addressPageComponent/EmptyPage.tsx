import "./EmptyPage.scss";
import Image from "next/image";
import location from "../../../public/images/popup-location.png";
import add from "../../../public/images/popup-add.png";

interface EmptyPageProps {
    setCurrentPage: (page: number) => void;
}

export default function EmptyPage(props: EmptyPageProps) {

    return (
        <div className="emptyPage-root">
            <div className="emptyPage-location-imageBox">
                <Image src={location} alt="location Icon" className="emptyPage-location-image"></Image>
            </div>
            <div className="emptyPage-text-up">You Don't Have any added address</div>
            <div className="emptyPage-text-down">Add your address, start shopping!</div>
            <div className="emptyPage-addNewAddressButton" onClick={() => props.setCurrentPage(2)}>
                <Image src={add} alt="add Icon" className="emptyPage-addNewAddressButton-image"></Image>
                <div className="emptyPage-addNewAddressButton-text">Add New Address</div>
            </div>
        </div>
    )
}