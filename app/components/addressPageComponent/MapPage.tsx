"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
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

    // State for address
    const [building, setBuilding] = useState(props.suggestion?.address.building);
    const [city, setCity] = useState(props.suggestion?.address.city);
    const [village, setVillage] = useState(props.suggestion?.address.village);
    const [state, setState] = useState(props.suggestion?.address.state);
    const [roomNumber, setRoomNumber] = useState("");
    const [addressName, setAddressName] = useState(props.suggestion?.name);

    useEffect(() => {
        console.log(building);
    }), [building];

    return (
        <div className="mapPage-root">
            <MapContainer center={position} zoom={17} scrollWheelZoom={false} className="mapPage-map">
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
                <div className="mapPage-info-addressName">
                    <div className="mapPage-info-addressName-header">Address</div>
                    <input className="mapPage-info-addressName-input" placeholder="address" value={addressName} onChange={(e) => setAddressName((e.target as HTMLInputElement).value)}></input>
                </div>
                <div className="mapPage-info-streetAddress">
                    <div className="mapPage-info-streetAddress-room">
                        <div className="mapPage-info-streetAddress-room-header">Room Number</div>
                        <input className="mapPage-info-streetAddress-room-input" placeholder="Your Room Number" value={roomNumber} onChange={(e) => setRoomNumber((e.target as HTMLInputElement).value)}></input>
                    </div>
                    <div className="mapPage-info-streetAddress-building">
                        <div className="mapPage-info-streetAddress-building-header">Building</div>
                        <input className="mapPage-info-streetAddress-building-input" placeholder="Address" value={building} onChange={(e) => setBuilding((e.target as HTMLInputElement).value)}></input>
                    </div>
                </div>
                <div className="mapPage-info-addressDetail">
                    <div className="mapPage-info-addressDetail-village">
                        <div className="mapPage-info-addressDetail-village-header">Village</div>
                        <input className="mapPage-info-addressDetail-village-input" placeholder="village" value={village} onChange={(e) => setVillage((e.target as HTMLInputElement).value)}></input>
                    </div>
                    <div className="mapPage-info-addressDetail-city">
                        <div className="mapPage-info-addressDetail-city-header">City</div>
                        <input className="mapPage-info-addressDetail-city-input" placeholder="city" value={city} onChange={(e) => setCity((e.target as HTMLInputElement).value)}></input>
                    </div>
                    <div className="mapPage-info-addressDetail-state">
                        <div className="mapPage-info-addressDetail-state-header">State</div>
                        <input className="mapPage-info-addressDetail-state-input" placeholder="state" value={state} onChange={(e) => setState((e.target as HTMLInputElement).value)}></input>
                    </div>
                </div>
                <div className="mapPage-info-instruction">
                    <div className="mapPage-info-instruction-header">Delivery Instruction</div>
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