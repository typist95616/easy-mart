import "./NavBarLocation.scss";
import Image from "next/image";
import locationLogo from "../../../public/images/location.png";
import clsx from "clsx";

interface NavBarLocationProps {
    className?: string;
}

export default function NavBarLocation(props: NavBarLocationProps) {
    return (
        <div className={clsx("navbar-location-root", props.className)}>
            <Image src={locationLogo} alt="location logo" className="navbar-location-image"></Image>
            <div className="navbar-location-text">1115 Tai Po</div>
        </div>
    )
}