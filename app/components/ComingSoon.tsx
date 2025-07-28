import "./ComingSoon.scss";
import Image from "next/image";
import ComingSoonIcon from "@/public/images/comingSoon.png";

export default function ComingSoon() {

    return (
        <div className="comingSoon-root">
            <Image src={ComingSoonIcon} alt="coming soon icon" className="comingSoon-icon"></Image>
            <div className="comingSoon-text">Coming Soon!</div>
        </div>
    )
}