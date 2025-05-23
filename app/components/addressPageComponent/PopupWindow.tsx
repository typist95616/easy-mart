"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import closeIcon from "../../../public/images/close.png";
import Image from "next/image";
import AddressInputPage from "./AddressInputPage";
import EmptyPage from "./EmptyPage";
import leftArrow from "../../../public/images/popup-leftArrow.png";
import "./PopupWindow.scss";
import dynamic from 'next/dynamic';
import { Suggestion } from '@/app/types/Suggestion';

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

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [currentSuggestion, setCurrentSuggestion] = useState<Suggestion>();

    const MapPage = dynamic(() => import('./MapPage'), { ssr: false });
    const handlePreviousPage = () => {
        if(currentPage === 2) {
            setCurrentPage(1);
        } else if(currentPage === 3) {
            setCurrentPage(2);
        }
    }

    return (
        <div className="popup-root">
            <div className="popup-header">
                <div className="popup-header-left">
                    {currentPage > 1 && (
                        <div className="popup-header-imageBox">
                        <Image src={leftArrow} alt="back button" className="popup-header-leftArrow-image" onClick={handlePreviousPage}></Image>
                        </div>
                    )}
                    <div className="popup-header-text">Add New Address</div>
                </div>
                <Image src={closeIcon} alt="close Icon" className="popup-header-close-image" onClick={() => props.setIsLocationPopupOpen(false)}></Image>
            </div>
            <div className="popup-divider"></div>
            <div className="popup-content">
                {currentPage === 1 && (
                    <EmptyPage setCurrentPage={setCurrentPage}/>
                )}  
                {currentPage === 2 && (
                    <AddressInputPage setCurrentPage={setCurrentPage} setCurrentSuggestion={setCurrentSuggestion}/>
                )}  
                {currentPage === 3 && (
                    <MapPage suggestion={currentSuggestion}/>
                )}
            </div>
        </div>

    )
}