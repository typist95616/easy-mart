"use client";

import "./main.scss";
import NavBarV2 from "../../components/NavBarV2";
import FooterV2 from "../../components/FooterV2";
import { useSearchParams } from "next/navigation";
import pathArrow from "../../../public/images/path-arrow.png";
import Image from "next/image";
import ProductOverview from "../../components/ProductPageComponent/ProductOverview"
import ProductReview from "../../components/ProductPageComponent/ProductReview"
import Link from "next/link";

interface ProductProps {
    productName: string;
    productImage: string;
    pricePerLb: number;
    totalPrice: number;
    stock: number;
    description: string;
    detail: string;
}

export default function Main(props: ProductProps) {

    const searchParams = useSearchParams();

    const productName = searchParams.get("productName");
    const productImage = searchParams.get("productImage");
    const pricePerLb = searchParams.get("pricePerLb");
    const totalPrice = searchParams.get("totalPrice");
    const stock = searchParams.get("stock");
    const description = searchParams.get("description");
    const detail = searchParams.get("detail");

    return (
        <div>
            <NavBarV2 />
            <div className="productPage-root">
                <div className="productPage-path">
                    <Link href="./main">
                        <div className="productPage-path-text">Home</div> 
                    </Link>
                    <Image src={pathArrow} alt="right-arrow" className="productPage-path-arrow"></Image> 
                    <div className="productPage-path-text product-name">{productName}</div>
                </div>
                <ProductOverview productName={productName} productImage={productImage} pricePerLb={pricePerLb} totalPrice={totalPrice} stock={stock} description={description} detail={detail}></ProductOverview>
                <ProductReview />
                <div className="productPage-detail">
                    <div className="productPage-detail-header">Details</div>
                    <div className="productPage-detail-content">{detail}</div>
                </div>
                <div>Recommendations</div>
            </div>
            <FooterV2 />
        </div>
    )
}