import "./banner.css";
import poster1 from "../images/poster1.png";
import poster2 from "../images/poster2.png";
import poster3 from "../images/poster3.png";
import poster4 from "../images/poster4.png";
import poster5 from "../images/poster5.png";
import Image from "next/image";


export default function Banner() {
    return (
        <div className="whole-banner">
            <div className="banner-images">
                <Image src={poster1} alt="poster1" className="banner-poster poster1"></Image>
                <Image src={poster2} alt="poster2" className="banner-poster poster2"></Image>
                <Image src={poster3} alt="poster3" className="banner-poster poster3"></Image>
                <Image src={poster4} alt="poster4" className="banner-poster poster4"></Image>
                <Image src={poster5} alt="poster5" className="banner-poster poster5"></Image>
                <Image src={poster1} alt="poster1" className="banner-poster poster6"></Image>
                <Image src={poster2} alt="poster2" className="banner-poster poster7"></Image>
                <Image src={poster3} alt="poster3" className="banner-poster poster8"></Image>
                <Image src={poster4} alt="poster4" className="banner-poster poster9"></Image>
                <Image src={poster5} alt="poster5" className="banner-poster poster10"></Image>
            </div>
            <div className="banner-images">
                <Image src={poster2} alt="poster2" className="banner-poster poster2"></Image>
                <Image src={poster1} alt="poster1" className="banner-poster poster1"></Image>
                <Image src={poster5} alt="poster5" className="banner-poster poster5"></Image>
                <Image src={poster1} alt="poster1" className="banner-poster poster6"></Image>
                <Image src={poster3} alt="poster3" className="banner-poster poster8"></Image>
                <Image src={poster2} alt="poster2" className="banner-poster poster7"></Image>
                <Image src={poster3} alt="poster3" className="banner-poster poster3"></Image>
                <Image src={poster4} alt="poster4" className="banner-poster poster9"></Image>
                <Image src={poster5} alt="poster5" className="banner-poster poster10"></Image>
            </div>
        </div>
    )
}