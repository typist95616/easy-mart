"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import closeIcon from "../../../public/images/close.png";
import Image from "next/image";
import "./Map.scss";

// Function to update map's location using map.setView()
function MapUpdater({ position }: { position: [number, number]}) {
    const map = useMap();
    map.setView(position);
    return null;
}

export default function Map() {

    // State for getting address input
    const [address, setAddress] = useState(""); 
    const [position, setPosition] = useState<[number, number]>([22.4494017, 114.1711328]);
    const [fullAddress, setFullAddress] = useState<String | null>(null);

    // Function using OpenStreetMap API to translate address to coordinates
    const searchAddress = async () => {
        console.log("search clicked");
        if(!address) return;
        try {
            // Translate address to coordinates using Nominatim API, limit to 2 results
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=2`);
            const data = await response.json();
            console.log(data);
            if (data && data.length > 0) {
                setPosition([parseFloat(data[0].lat), parseFloat((data[0].lon))]);
                setFullAddress(data[0].display_name);
            }
        } catch (error) {

            setFullAddress("Failed to find location.");
        }
    }

    return (
        <div className="popup-root">
            <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: "500px", width: "500px"}}>
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
        </div>

    )
}