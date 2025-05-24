"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import "./MapPage.scss";
import { Suggestion } from '@/app/types/Suggestion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import saveLocationIcon from "../../../public/images/mapPage-saveLocation.png"

// Function to update map's location using map.setView()
function MapUpdater({ position }: { position: [number, number] }) {
    const map = useMap();
    map.setView(position);
    return null;
}

interface MapPageProps {
    suggestion?: Suggestion;
}

export default function Map(props: MapPageProps) {

    //test
    const addressString = props.suggestion?.address ? 
  `${props.suggestion.address.building}, ${props.suggestion.address.city}, ${props.suggestion.address.state_district}, ${props.suggestion.address.state}, ${props.suggestion.address.postcode}, ${props.suggestion.address.country}` : 
  'Address not available';

    const [currentAddressType, setCurrentAddressType] = useState("Home");

    // Default vehicle for the map location
    const [lat, setLat] = useState(props.suggestion?.lat ?? 22.4494017);
    const [lon, setLon] = useState(props.suggestion?.lon ?? 114.1711328);

    // State for getting address input
    const [position, setPosition] = useState<[number, number]>([lat, lon]);

    return (
        <div className="mapPage-root">
            <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="mapPage-map">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapUpdater position={position}></MapUpdater>
                {/* <Marker position={[22.4494017, 114.1711328]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> */}
            </MapContainer>
            <div className="mapPage-info">
                {addressString}
                <div className="mapPage-info-addressType">
                    <div className="mapPage-info-addressType-header">Select Address Type</div>
                    <div className="mapPage-info-addressType-content">
                        <div className={`mapPage-info-addressType-home ${currentAddressType === 'Home' ? 'selected' : ""}`} onClick={() => setCurrentAddressType('Home')}>
                            <div className="mapPage-info-addressType-home-text">Home</div>
                        </div>
                        <div className={`mapPage-info-addressType-apartment ${currentAddressType === 'Apartment' ? 'selected' : ""}`} onClick={() => setCurrentAddressType('Apartment')}>
                            <div className="mapPage-info-addressType-apartment-text">Apartment</div>
                        </div>
                        <div className={`mapPage-info-addressType-office ${currentAddressType === 'Office' ? 'selected' : ""}`} onClick={() => setCurrentAddressType('Office')}>
                            <div className="mapPage-info-addressType-office-text">Office</div>
                        </div>
                    </div>
                </div>
                <div className="mapPage-info-streetAddress">
                    <div className="mapPage-info-streetAddress-header">Street Address</div>
                    <input className="mapPage-info-streetAddress-input" placeholder="Address"></input>
                </div>
                <div className="mapPage-info-addressDetail">
                    <div className="mapPage-info-addressDetail-city">
                        <div className="mapPage-info-addressDetail-city-header">City</div>
                        <input className="mapPage-info-addressDetail-city-input" placeholder="city"></input>
                    </div>
                    <div className="mapPage-info-addressDetail-number">
                        <div className="mapPage-info-addressDetail-number-header">Number</div>
                        <input className="mapPage-info-addressDetail-number-input" placeholder="number"></input>
                    </div>
                    <div className="mapPage-info-addressDetail-zip">
                        <div className="mapPage-info-addressDetail-zip-header">Zip Code</div>
                        <input className="mapPage-info-addressDetail-zip-input" placeholder="zip code"></input>
                    </div>
                </div>
                <div className="mapPage-info-instruction">
                    <div className="mapPage-info-instruction-header"></div>
                    <input className="mapPage-info-instruction-input" placeholder="Delivery Instruction"></input>
                </div>
                <div className="mapPage-info-safeButton">
                    <Image src={saveLocationIcon} alt="location Icon" className="mapPage-info-safeButton-image"></Image>
                    <div className="mapPage-info-safeButton-text">Save Location</div>
                </div>
            </div>
        </div>

    )
}