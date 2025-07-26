import "./SettingOrderPage.scss";
import ProductImageSlider from "../ProductImageSlider";
import MyOrderReceipt from "@/public/images/myOrder-receipt.png";
import WhiteCart from "@/public/images/cart-white.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SettingOrderPage() {

    const router = useRouter();

    return (
        <div className="settingOrderPage-root">
            <div className="settingOrderPage-title">My Order</div>
            <div className="settingOrderPage-content">
                <Image src={MyOrderReceipt} alt="receipt icon" width={84} height={84}></Image>
                <div className="settingOrderPage-content-emptyOrder-h1">You Don't Have any order yet</div>
                <div className="settingOrderPage-content-emptyOrder-h2">Explore and place your first order now!</div>
                <div className="settingOrderPage-content-startButton" onClick={() => router.push("./main")}>
                    <Image src={WhiteCart} alt="cart icon" width={24} height={24}></Image>
                    <div className="settingOrderPage-content-startButton-text">Start Shopping</div>
                </div>
            </div>
            {/* <div className="settingOrderPage-imageSlider"> 
                <ProductImageSlider></ProductImageSlider>
            </div> */}
        </div>
    )
} 