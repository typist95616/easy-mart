"use client";

import "./main.scss";
import Image from "next/image";
import CloseIcon from "@/public/images/close.png";
import { useRouter } from "next/navigation";
import { useAddress } from "@/app/Context/AddressQuery";
import EmptyPage from "@/app/components/addressPageComponent/EmptyPage";
import { useState } from "react";
import AddressListPage from "@/app/components/addressPageComponent/AddressListPage";
import AddressInputPage from "@/app/components/addressPageComponent/AddressInputPage";
import dynamic from "next/dynamic";

export default function Main() {

    const router = useRouter();
    const { addressList, currentAddress } = useAddress();
    const [currentPage, setCurrentPage] = useState<number>(1);

    const goBack = () => {
        router.push("/pages/main");
    }

    const MapPage = dynamic(() => import('@/app/components/addressPageComponent/MapPage'), { ssr: false });
    const AddressEditPage = dynamic(() => import('@/app/components/addressPageComponent/AddressEditPage'), { ssr: false });

    return (
        <div className="mobileAddress-root">
            <div className="heading">
                <Image src={CloseIcon} alt="close icon" width={20} height={20} onClick={goBack}></Image>
                <div className="heading-text">Address</div>
            </div>
            <div className="content">
                {(addressList === null || addressList?.length === 0) && currentPage === 1 && (
                    <EmptyPage></EmptyPage>
                )}
                {addressList?.length != 0 && addressList != null && currentPage === 1 && (
                    <AddressListPage setCurrentPage={setCurrentPage}></AddressListPage>
                )}
                {currentPage === 2 && (
                    <AddressInputPage setCurrentPage={setCurrentPage} />
                )}
                {currentPage === 3 && (
                    <MapPage address={currentAddress} setCurrentPage={setCurrentPage} />
                )}
                {currentPage === 4 && (
                    <AddressEditPage address={currentAddress!} setCurrentPage={setCurrentPage} />
                )}
            </div>
        </div>
    )
}