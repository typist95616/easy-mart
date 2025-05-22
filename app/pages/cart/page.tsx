"use client";

import "./main.scss";
import NavbarV2 from "@/app/components/NavBarV2";
import FooterV2 from "@/app/components/FooterV2";
import cartIcon from "../../../public/images/cartpage-cart.png";
import locationIcon from "../../../public/images/cartpage-location.png";
import calendarIcon from "../../../public/images/cartPage-calendar.png";
import rightArrow from "../../../public/images/cartPage-rightArrow.png";
import Image from "next/image";
import Recommendations from "@/app/components/ProductPageComponent/Recommendations";
import checkOutIcon from "../../../public/images/card.png";
import { useCart } from "../../Context/CartContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ItemList from "@/app/components/cartPageComponent/ItemList";
import closeIcon from "../../../public/images/close.png";

export default function Main() {

    const router = useRouter();
    const [freeDeliveryProgress, setFreeDeliveryProgress] = useState(0);
    const { getTotalPrice } = useCart();
    const [deliveryFee, setDeliveryFee ] = useState(5);
    const [toFreeDelivery, setToFreeDelivery] = useState(150);

    const goBack = () => {
        router.back();
    }

    // Free delivery fee if over $150
    useEffect(() => {
            if(getTotalPrice() >= 150) {
                setDeliveryFee(0);
                setFreeDeliveryProgress(100);
                setToFreeDelivery(0);
            } else {
                setDeliveryFee(5);
                setToFreeDelivery(150 - getTotalPrice());
                if(getTotalPrice() === 0) {
                    setFreeDeliveryProgress(0);
                } else {
                    setFreeDeliveryProgress((getTotalPrice() / 150) * 100);
                }
            }
        }
    ), [getTotalPrice];

    // Display number with two decimal places
    const formatPrice = (price: number) => (Math.round(price * 100) / 100).toFixed(2);

    return (
        <div>
            <NavbarV2 className="cartPage-desktop-navBar"/>
            <div className="cartPage-mobile-navBar">
                <Image src={closeIcon} alt="close icon" className="cartPage-mobile-navBar-image" onClick={goBack}></Image>
                <div className="cartPage-mobile-navBar-header">My Cart</div>
            </div>
            <div className="cartPage-root">
                <div className="cartPage-left">
                    <div className="cartPage-locationBox">
                        <div className="cartPage-locationBox-desktop">
                            <div className="cartPage-locationBox-locationIcon">
                                <div className="cartPage-locationBox-locationIcon-imageBox">
                                    <Image src={cartIcon} alt="cart Icon" width={30} height={30} className="cartPage-locationBox-locationIcon-image"></Image>
                                </div>
                            </div>
                            <div className="cartPage-locationBox-text">
                                <div className="cartPage-locationBox-text-name">Local Market</div>
                                <div className="cartPage-locationBox-text-addressBox">
                                    <Image src={locationIcon} alt="location icon" className="cartPage-locationBox-text-addressIcon"></Image>
                                    <div className="cartPage-locationBox-text-addressText">Shopping in 07114</div>
                                </div>
                            </div>
                            <div className="cartPage-locationBox-spacer"></div>
                            <div className="cartPage-locationBox-date">
                                <Image src={calendarIcon} alt="calendar" className="cartPage-locationBox-date-image"></Image>
                                <div className="cartPage-locationBox-date-text">Wed 123</div>
                                <Image src={rightArrow} alt="right arrow" className="cartPage-locationBox-date-arrow"></Image>
                            </div>
                        </div>
                        <div className="cartPage-locationBox-mobile">
                            <div className="cartPage-locationBox-summary">Order Summary</div>
                            <div className="cartPage-locationBox-priceBox">
                                <div className="cartPage-locationBox-priceBox-itemPrice">
                                    <div className="cartPage-locationBox-priceBox-itemPrice-text">Items total</div>
                                    <div className="cartPage-locationBox-priceBox-itemPrice-price">${formatPrice(getTotalPrice())}</div>
                                </div>
                                <div className="cartPage-locationBox-priceBox-deliveryFee">
                                    <div className="cartPage-locationBox-priceBox-deliveryFee-text">Delivery Fee</div>
                                    <div className="cartPage-locationBox-priceBox-deliveryFee-price">${formatPrice(deliveryFee)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ItemList></ItemList>
                    <div className="cartPage-mobile-checkOutBox">
                        <div className="cartPage-freeShippingInfo">
                            <div className="cartPage-freeShippingInfo-bar">
                                <div className="cartPage-freeShippingInfo-bar-fill" style={{ width: `${freeDeliveryProgress}%`, transition: 'width 0.3s ease-in-out' }}></div>
                            </div>
                            <div className="cartPage-freeShippingInfo-text">
                                {deliveryFee === 0 ?
                                "Free Delivery!!" : 
                                `Free Delivery! $${formatPrice(toFreeDelivery)} on this order to Go to`
                                }
                            </div>
                        </div>
                        <div className="cartPage-checkoutBox-subTotal">
                        <div className="cartPage-checkoutBox-subTotal-text">Subtotal</div>
                        <div className="cartPage-checkoutBox-subTotal-amount">${formatPrice(getTotalPrice() + deliveryFee)}</div>
                    </div>
                    <div className="cartPage-checkoutBox-checkoutButton">
                        <div className="cartPage-checkoutBox-checkoutButton-left">
                            <Image src={checkOutIcon} alt="checkout Icon" className="cartPage-checkoutBox-checkoutButton-image"></Image>
                            <div className="cartPage-checkoutBox-checkoutButton-text">Checkout</div>
                        </div>
                        <div className="cartPage-checkoutBox-checkoutButton-amount">${formatPrice(getTotalPrice() + deliveryFee)}</div>
                    </div>
                    </div>
                    <Recommendations className="cartPage-recommendations"></Recommendations>
                </div>
                <div className="cartPage-right">
                    <div className="cartPage-freeShippingInfo">
                        <div className="cartPage-freeShippingInfo-bar">
                            <div className="cartPage-freeShippingInfo-bar-fill" style={{ width: `${freeDeliveryProgress}%`, transition: 'width 0.3s ease-in-out' }}></div>
                        </div>
                        <div className="cartPage-freeShippingInfo-text">
                            {deliveryFee === 0 ?
                            "Free Delivery!!" : 
                            `Free Delivery! $${formatPrice(toFreeDelivery)} on this order to Go to`
                            }
                        </div>
                    </div>
                    <div className="cartPage-checkoutBox-summary">Order Summary</div>
                    <div className="cartPage-checkoutBox-priceBox">
                        <div className="cartPage-checkoutBox-priceBox-itemPrice">
                            <div className="cartPage-checkoutBox-priceBox-itemPrice-text">Items total</div>
                            <div className="cartPage-checkoutBox-priceBox-itemPrice-price">${formatPrice(getTotalPrice())}</div>
                        </div>
                        <div className="cartPage-checkoutBox-priceBox-deliveryFee">
                            <div className="cartPage-checkoutBox-priceBox-deliveryFee-text">Delivery Fee</div>
                            <div className="cartPage-checkoutBox-priceBox-deliveryFee-price">${formatPrice(deliveryFee)}</div>
                        </div>
                    </div>
                    <div className="cartPage-divider"></div>
                    <div className="cartPage-checkoutBox-subTotal">
                        <div className="cartPage-checkoutBox-subTotal-text">Subtotal</div>
                        <div className="cartPage-checkoutBox-subTotal-amount">${formatPrice(getTotalPrice() + deliveryFee)}</div>
                    </div>
                    <div className="cartPage-checkoutBox-checkoutButton">
                        <div className="cartPage-checkoutBox-checkoutButton-left">
                            <Image src={checkOutIcon} alt="checkout Icon" className="cartPage-checkoutBox-checkoutButton-image"></Image>
                            <div className="cartPage-checkoutBox-checkoutButton-text">Checkout</div>
                        </div>
                        <div className="cartPage-checkoutBox-checkoutButton-amount">${formatPrice(getTotalPrice() + deliveryFee)}</div>
                    </div>
                </div>
            </div>
            <FooterV2 />
        </div>
    )
}