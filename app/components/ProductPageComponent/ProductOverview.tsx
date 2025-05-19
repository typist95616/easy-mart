import "./ProductOverview.scss";
import shoppingCart from "../../../public/images/shopping-cart.png";
import cup from "../../../public/images/cup.png";
import tick from "../../../public/images/tick.png";
import Image from "next/image";
import loadingIcon from "../../../public/images/loading.png";
import { useCart } from "@/app/Context/CartContext";
import { useState } from "react";

interface ProductProps {
    id: number;
    productName: string | null;
    productImage: any;
    pricePerLb: number | string | null;
    totalPrice: number | string | null;
    stock: number | string | null;
    description: string | null;
    detail: string | null;
}

export default function ProductOverview(props: ProductProps) {

    const { addToCart } = useCart();
    const [showPopUp, setShowPopUp] = useState(false);

    const handleAddToCart = () => {
        addToCart({id: props.id, quantity: 1});
        setShowPopUp(true);
        // set pop up false after 2 seconds
        setTimeout(() => {
            setShowPopUp(false);
        }, 2000);
    }

    return (
        <>
        {showPopUp && (
            <div className="popup-addedToCart">Item added to cart!</div>
        )}
            <div className="productOverview-root">
                <div className="productOverview-imageBox">
                    {props.productImage ? (
                            <Image alt="product-image" src={props.productImage ?? ""} className="productCard-imageBox-image" width={700} height={540} quality={100}></Image>
                        ) : (
                            <Image src={loadingIcon} alt="loading icon" className="productCard-imageBox-image" width={700} height={540}></Image>
                        )}
                </div>
                <div className="productOverview-spacer"></div>
                <div className="productOverview-info">
                    <div className="productOverview-info-description">{props.description}</div>
                    <div className="productOverview-info-pricePerLb">${props.pricePerLb}/lb</div>
                    <div className="productOverview-info-priceBox">
                        <div className="productOverview-info-priceBox-special">${props.totalPrice}</div>
                        <div className="productOverview-info-priceBox-orginal">${props.totalPrice}</div>
                    </div>
                    <div className="productOverview-info-stock">{props.stock} Left</div>
                    <div className="productOverview-info-addToCart" onClick={handleAddToCart} style={{cursor:"pointer"}}>
                        <Image src={shoppingCart} alt="cart logo" className="productOverview-info-addToCart-image"></Image>
                        <div className="productOverview-info-addToCart-text">Add To Cart</div>
                    </div>
                    <div className="productOverview-info-aboutProduct">
                        <div className="productOverview-info-aboutProduct-text">About Product</div>
                        <div className="productOverview-info-aboutProduct-bestSeller">
                            <div className="productOverview-info-aboutProduct-imageBox">
                                <Image src={cup} alt="cup" className="productOverview-info-aboutProduct-bestSeller-image"></Image>
                            </div>
                            <div className="productOverview-info-aboutProduct-bestSeller-text">Best Seller Product</div>
                        </div>
                        <div className="productOverview-info-aboutProduct-satisfaction">
                            <div className="productOverview-info-aboutProduct-imageBox">
                                <Image src={tick} alt="tick" className="productOverview-info-aboutProduct-satisfaction-image"></Image>
                            </div>
                            <div className="productOverview-info-aboutProduct-satisfaction-text">100% Satisfaction Guarantee</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}