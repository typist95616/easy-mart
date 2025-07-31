"use client";

import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import closeIcon from "../../../public/images/close.png";
import Image from "next/image";
import AddressInputPage from "./AddressInputPage";
import EmptyPage from "./EmptyPage";
import leftArrow from "../../../public/images/popup-leftArrow.png";
import "./PopupWindow.scss";
import dynamic from 'next/dynamic';
import { useAddress } from '@/app/Context/AddressQuery';
import AddressListPage from "./AddressListPage";

// Function to update map's location using map.setView()
function MapUpdater({ position }: { position: [number, number]}) {
    const map = useMap();
    map.setView(position);
    return null;
}

interface PopupWindowProps {
    setIsLocationPopupOpen: (isOpen: boolean) => void;
}

export default function PopupWindow(props: PopupWindowProps) {

    const { addressList, currentAddress } = useAddress();

    const [currentPage, setCurrentPage] = useState<number>(1)

    const MapPage = dynamic(() => import('./MapPage'), { ssr: false });
    const AddressEditPage = dynamic(() => import('./AddressEditPage'), { ssr: false });
    const handlePreviousPage = () => {
        if(currentPage === 2) {
            setCurrentPage(1);
        } else if(currentPage === 3) {
            setCurrentPage(2);
        }
    }

    useEffect(() => {
        console.log("currentAddress: ", currentAddress);
        console.log("addressList: ", addressList);
    }, [])

    return (
        <div className="popup-root">
            <div className="popup-header">
                <div className="popup-header-left">
                    {currentPage === 4 && (
                        <div className="popup-header-text">Edit Address</div>
                    )}
                    {currentPage > 1 && currentPage !== 4 && (
                        <div className="popup-header-imageBox">
                        <Image src={leftArrow} alt="back button" className="popup-header-leftArrow-image" onClick={handlePreviousPage}></Image>
                        </div>
                    )}
                    {addressList && addressList.length > 0 && currentPage !== 4 && (
                        <div className="popup-header-text">Choose Address</div> 
                    )}
                    {(!addressList || addressList.length === 0) && currentPage !== 4 && (
                        <div className="popup-header-text">Add New Address</div>
                    )}
                </div>
                <Image src={closeIcon} alt="close Icon" className="popup-header-close-image" onClick={() => props.setIsLocationPopupOpen(false)}></Image>
            </div>
            <div className="popup-divider"></div>
            <div className="popup-content">
                {currentPage === 1 && (!addressList || addressList.length === 0) && (
                    <EmptyPage setCurrentPage={setCurrentPage}/>
                )}  
                {currentPage === 1 && addressList && addressList.length > 0 && (
                    <AddressListPage setCurrentPage={setCurrentPage}></AddressListPage>
                )}
                {currentPage === 2 && (
                    <AddressInputPage setCurrentPage={setCurrentPage}/>
                )}  
                {currentPage === 3 && (
                    <MapPage address={currentAddress} setCurrentPage={setCurrentPage}/>
                )}
                {currentPage === 4 && (
                    <AddressEditPage address={currentAddress!} setCurrentPage={setCurrentPage}></AddressEditPage>
                )}
            </div>
        </div>

    )
}