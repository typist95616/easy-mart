// "use client";

import "./main.scss";
// import dynamic from "next/dynamic";

// const MapView = dynamic(() => import("../../components/addressPageComponent/Map"), { ssr: false })

export default function AddressPage() {
    return (
        <div className="addressPage-root">
            <div>address page</div>
            {/* <MapView></MapView> */}
        </div>
    )
}