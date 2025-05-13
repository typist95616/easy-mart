import "./ProductCard.css";
import Image from "next/image";
import { useState } from "react";

interface ProductProps {
    productName: string;
    productImage: any;
    pricePerLb: number;
    totalPrice: number;
    stock: number;
}   

export default function ProductCard({productName, productImage, pricePerLb, totalPrice, stock}: ProductProps) {

    return (
        <div className="whole-productCard">
            <div className="productCard-imageBox">
                <Image alt="product-image" src={productImage} className="productCard-image" width={206} height={154}></Image>
            </div>
            <div className="productCard-name">{productName}</div>
            <div className="productCard-pricePerLb">${pricePerLb}/lb</div>
            <div className="productCard-price">
                <div className="productCard-totalPrice">${totalPrice}</div>
                <div className="prodcutCard-orginalTotal">${totalPrice}</div>
            </div>
            <div className="productCard-stock">
                <div className="productCard-stockLeft">{stock} Left</div>
                <div className="productCard-stockDivider">|</div>
                <div className="productCard-stockRight">{stock} Left</div>
            </div>
        </div>
    )
}