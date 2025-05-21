"use client";

import "./ItemListProductCard.scss";
import Image from "next/image";
import { useCart } from "@/app/Context/CartContext";
import minusIcon from "../../../public/images/minus.png";
import plusIcon from "../../../public/images/add.png";
import trashIcon from "../../../public/images/trash.png";

interface ItemListProductCardProps {
    id: number;
    productName: string;
    productPrice: number;
    productImage: string;
}

export default function ItemListProductCard(props: ItemListProductCardProps) {

    const { getItemQuantity, removeOneFromCart, addOneToCart, removeFromCart } = useCart();

    const totalPrice = props.productPrice * getItemQuantity(props.id);

    const formatPrice = (price: number) => (Math.round(price * 100) / 100).toFixed(2);

    return (
        <div className="ItemListProductCard-root">
            <div className="ItemListProductCard-left">
                <div className="ItemListProductCard-imageBox">
                    <Image src={props.productImage} alt="product Image" width={60} height={40}></Image>
                </div>
                <div className="ItemListProductCard-productInfo">
                    <div className="ItemListProductCard-productInfo-name">{props.productName}</div>
                    <div className="ItemListProductCard-productInfo-price">
                        <div className="ItemListProductCard-productInfo-price-totalPrice">${props.productPrice}</div>
                        <div className="ItemListProductCard-productInfo-price-oringalPrice">${props.productPrice}</div>
                    </div>
                </div>
            </div>
            <div className="ItemListProductCard-productInfo-spacer"></div>
            <div className="ItemListProductCard-right">
                <div className="ItemListProductCard-productInfo-quantity">
                    <div className="ItemListProductCard-productInfo-quantity-minusBox" onClick={() => removeOneFromCart(props.id)}>
                        {getItemQuantity(props.id) >= 2 ? (
                            <Image src={minusIcon} alt="minus Icon" className="ItemListProductCard-productInfo-quantity-minusImage"></Image>
                        ) : (
                            <Image src={trashIcon} alt="trash Icon" className="ItemListProductCard-productInfo-quantity-minusImage"></Image>
                        )}
                    </div>
                    <div className="ItemListProductCard-productInfo-quantity-number">{getItemQuantity(props.id)}</div>
                    <div className="ItemListProductCard-productInfo-quantity-plusBox" onClick={() => addOneToCart(props.id)}>
                        <Image src={plusIcon} alt="plus Icon" className="ItemListProductCard-productInfo-quantity-plusImage"></Image>
                    </div>
                </div>
                <div className="ItemListProductCard-productInfo-remove" onClick={() => removeFromCart(props.id)}>Remove</div>
                <div className="ItemListProductCard-productInfo-total">${formatPrice(totalPrice)}</div>
            </div>
        </div>
    )
}