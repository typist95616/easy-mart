import "./ProductCardV2.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import loadingIcon from "../../../public/images/loading.png";
import { Product } from "@/app/types/Product";
import { Skeleton } from "antd";
import SkeletonImage from "antd/es/skeleton/Image";

interface ProductProps {
    ID: number;
    className?: string;
}

export default function ProductCardV2(props: ProductProps) {

    const [product, setProducts] = useState<Product>();

    const fetchProducts = async () => {
        const res = await fetch('/api/products/searchByID?ID=' + props.ID);
        const data = await res.json();
        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, [props.ID]);

    return (
        <div className="whole-productCard">
            <Link href={{
                pathname: "./product",
                query: {
                    ID: props.ID,
                },
            }}
            >
                <div className="productCard-imageBox">
                    {product?.img_url ? (
                        <Image alt="product-image" src={product?.img_url ?? ""} className="productCard-image" width={206} height={154}></Image>
                    ) : (
                        <SkeletonImage active style={ {width: 206, height: 154} }/>
                    )}
                </div>
            </Link>
            <div className="productCard-name">{product?.name}</div>
            <div className="productCard-pricePerLb">${product?.price_per_lb}/lb</div>
            <div className="productCard-price">
                <div className="productCard-totalPrice">${product?.total_price}</div>
                <div className="prodcutCard-orginalTotal">${product?.total_price}</div>
            </div>
            <div className={clsx("productCard-stock", props.className)}>
                <div className="productCard-stockLeft">{product?.stock} Left</div>
                <div className="productCard-stockDivider">|</div>
                <div className="productCard-stockRight">{product?.stock} Left</div>
            </div>
        </div>
    )
}