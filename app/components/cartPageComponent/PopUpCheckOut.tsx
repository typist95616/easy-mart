import "./PopUpCheckOut.scss";
import Image from "next/image";
import Close from "@/public/images/popup-close.png"
import { useState } from "react";

export default function PopUpCheckOut() {

    const [deliveryDate, setDeliveryDate] = useState();
    const [deliveryTime, setDeliveryTime] = useState();

    return (
        <div className="PopUpCheckOut-root">
            <div className="title">
                <div className="title-text">Choose your delivery date</div>
                <Image src={Close} alt="close icon" width={24} height={24} className="title-closeIcon"></Image>
            </div>
            <div className="select-date">
                
            </div>
            <div className="select-time">

            </div>
        </div>
    )
}