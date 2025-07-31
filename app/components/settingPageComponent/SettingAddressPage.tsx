import { useAddress } from "@/app/Context/AddressQuery";
import "./SettingAddressPage.scss";
import EmptyPage from "@/app/components/addressPageComponent/EmptyPage";
import { useEffect, useState } from "react";
import AddressListPage from "../addressPageComponent/AddressListPage";
import dynamic from "next/dynamic";
import AddressInputPage from "../addressPageComponent/AddressInputPage";


export default function SettingAddressPage() {

    const { addressList, currentAddress } = useAddress();
    const [currentPage, setCurrentPage] = useState<number>(1);

    const MapPage = dynamic(() => import('@/app/components/addressPageComponent/MapPage'), { ssr: false });
    const AddressEditPage = dynamic(() => import('@/app/components/addressPageComponent/AddressEditPage'), { ssr: false });

    return (
        <div className="settingAddressPage-root">
            {addressList === null && currentPage === 1 && (
                <>
                    <div className="heading">My Addresses</div>
                    <EmptyPage></EmptyPage>
                </>
            )}
            {addressList != null && currentPage === 1 && (
                <>
                    <div className="heading">My Addresses</div>
                    <AddressListPage setCurrentPage={setCurrentPage}></AddressListPage>
                </>
            )}
            {currentPage === 2 && (
                <>
                    <div className="heading">Add New Address</div>
                    <AddressInputPage setCurrentPage={setCurrentPage}></AddressInputPage>
                </>
            )}
            {currentPage === 3 && (
                <>
                    <div className="heading">Edit Address</div>
                    <MapPage address={currentAddress!} setCurrentPage={setCurrentPage}></MapPage>
                </>
            )}
            {currentPage === 4 && (
                <>
                    <div className="heading">Edit Address</div>
                    <MapPage address={currentAddress!} setCurrentPage={setCurrentPage}></MapPage>
                </>
            )}
        </div>
    )
}