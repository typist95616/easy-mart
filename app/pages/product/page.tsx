"use client";

import "./main.scss";
import NavBarV2 from "../../components/NavBarV2";
import FooterV2 from "../../components/FooterV2";
import { useSearchParams } from "next/navigation";
import pathArrow from "../../../public/images/path-arrow.png";
import Image from "next/image";
import ProductOverview from "../../components/ProductPageComponent/ProductOverview";
import ProductReview from "../../components/ProductPageComponent/ProductReview";
import Recommendations from "../../components/ProductPageComponent/Recommendations";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { Product } from "@/app/types/Product";

export default function Main() {

    return (
        <div>
            <NavBarV2 />
            <div className="productPage-root">
                <Suspense fallback={<div>Loading...</div>}>
                    <ProductPageContent/>
                </Suspense>
            </div>
            <FooterV2 />
        </div>
    )
}

function ProductPageContent() {

    const searchParams = useSearchParams();

    const productID = searchParams.get("ID");

    const [product, setProducts] = useState<Product>();

    // Get data from database
    const fetchProducts = async () => {
        const res = await fetch('/api/products/searchByID?ID=' + productID);
        const data = await res.json();
        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, [productID]);

    return (
        <>
            <div className="productPage-path">
                <Link href="./main">
                    <div className="productPage-path-text">Home</div>
                </Link>
                <Image src={pathArrow} alt="right-arrow" className="productPage-path-arrow"></Image>
                <div className="productPage-path-text product-name">{product?.name}</div>
            </div>

            <ProductOverview id={productID ? Number(productID) : 0} productName={product?.name ?? null} productImage={product?.img_url} pricePerLb={product?.price_per_lb || null} totalPrice={product?.total_price || null} stock={product?.stock || null} description={product?.description || null} detail={product?.detail || null} ></ProductOverview>
            <ProductReview />
            <div className="productPage-detail">
                <div className="productPage-detail-header">Details</div>
                <div className="productPage-detail-content">{product?.detail}</div>
            </div>
            <Recommendations></Recommendations>
        </>
    )

}