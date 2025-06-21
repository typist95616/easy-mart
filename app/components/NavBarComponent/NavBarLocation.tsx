"use client";

import "./NavBarLocation.scss";
import Image from "next/image";
import locationLogo from "../../../public/images/locationV2.png";
import clsx from "clsx";
import { useAddress } from "@/app/Context/AddressQuery";
import { useEffect } from "react";
import { useTokenAtom } from "@/app/Context/TokenAtom";

interface NavBarLocationProps {
    className?: string;
    onClick?: () => void;
}

export default function NavBarLocation(props: NavBarLocationProps) {

    const { currentAddress, setCurrentAddress, addressList, setAddressesList } = useAddress();
    const { token , setToken } = useTokenAtom();

    useEffect(() => {
        if (addressList) {
            setCurrentAddress(addressList[0]);
        }
    }, [!!addressList])

    // useEffect(() => {
    //     if (token) {
    //         const fetchUserInfo = async () => {
    //             const response = await fetch('/api/getUserInfo', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                 }
    //             })

    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setCurrentAddress(data.address[0]);
    //                 setAddressesList(data.address);
    //             } else {
    //                 console.error('Failed to fetch user info', response.status);
    //             }
    //         }
    //         fetchUserInfo();
    //     }
    // }, [token])

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