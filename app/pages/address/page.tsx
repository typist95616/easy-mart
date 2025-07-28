"use client";

import "./main.scss";
import Image from "next/image";
import CloseIcon from "@/public/images/close.png";
import { useRouter } from "next/navigation";
import { useAddress } from "@/app/Context/AddressQuery";
import EmptyPage from "@/app/components/addressPageComponent/EmptyPage";
import { useEffect } from "react";

export default function Main() {

    const router = useRouter();
    const { addressList } = useAddress();

    const goBack = () => {
        router.back();
    }

    useEffect(() => {
        console.log("current addressList: ", addressList);
    }, [])

    return (
        <div className="mobileAddress-root">
            <div className="heading">
                <Image src={CloseIcon} alt="close icon" width={20} height={20} onClick={goBack}></Image>
                <div className="heading-text">Address</div>
            </div>
            <div className="content">
                {(addressList === null || addressList?.length === 0) && (
                    <EmptyPage></EmptyPage>
                )}
                {addressList?.length != 0 && addressList != null && (
                    <div>address</div>
                )}
            </div>
        </div>
    )
}