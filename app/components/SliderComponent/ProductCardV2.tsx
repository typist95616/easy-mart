import "./ProductCardV2.scss";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

interface ProductProps {
    productName: string;
    productImage: any;
    pricePerLb: number;
    totalPrice: number;
    stock: number;
    description: string;
    detail: string;
    className?: string;
}

export default function ProductCardV2(props: ProductProps) {

    return (
        <div className="whole-productCard">
            <Link href={{
                pathname: "./product",
                query: {
                    productName: props.productName,
                    productImage: props.productImage,
                    pricePerLb: props.pricePerLb,
                    totalPrice: props.totalPrice,
                    stock: props.stock,
                    description: props.description,
                    detail: props.detail,
                },
            }}
            >
                <div className="productCard-imageBox">
                    <Image alt="product-image" src={props.productImage} className="productCard-image" width={206} height={154}></Image>
                </div>
            </Link>
            <div className="productCard-name">{props.productName}</div>
            <div className="productCard-pricePerLb">${props.pricePerLb}/lb</div>
            <div className="productCard-price">
                <div className="productCard-totalPrice">${props.totalPrice}</div>
                <div className="prodcutCard-orginalTotal">${props.totalPrice}</div>
            </div>
            <div className={clsx("productCard-stock", props.className)}>
                <div className="productCard-stockLeft">{props.stock} Left</div>
                <div className="productCard-stockDivider">|</div>
                <div className="productCard-stockRight">{props.stock} Left</div>
            </div>
        </div>
    )
}