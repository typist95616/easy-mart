"use client";

import "./NavBarLocation.scss";
import Image from "next/image";
import locationLogo from "../../../public/images/locationV2.png";
import clsx from "clsx";
import { useAddress } from "@/app/Context/AddressContext";

interface NavBarLocationProps {
    className?: string;
    onClick?: () => void;
}

export default function NavBarLocation(props: NavBarLocationProps) {

    const { currentAddress } = useAddress();

    return (
        <div className={clsx("navbar-location-root", props.className)} onClick={props.onClick}>
            <Image src={locationLogo} alt="location logo" className="navbar-location-image"></Image>
            <div className="navbar-location-text">
                {currentAddress?.building !== undefined && currentAddress?.roomNumber !== undefined ?
                `${currentAddress?.roomNumber} ${currentAddress?.building}` :
                "Your Address"
                }
            </div>
        </div>
    )
}