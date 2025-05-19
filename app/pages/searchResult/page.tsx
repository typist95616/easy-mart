"use client";

import "./main.scss";
import NavbarV2 from "../../components/NavBarV2";
import FooterV2 from "../../components/FooterV2";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Product } from "@/app/types/Product";
import ProductCardV2 from "../../components/SliderComponent/ProductCardV2";

export default function Main() {

    return (
        <div>
            <NavbarV2></NavbarV2>
            <div className="searchResult-root">
            <Suspense fallback={<div>Loading...</div>}>
                <SearchResultContent></SearchResultContent>
            </Suspense>
            </div>
            <FooterV2></FooterV2>
        </div>
    )
}

function SearchResultContent() {

    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";

    const [products, setProducts] = useState<Product[]>([]);
    const [filter, setFilter] = useState([]);

    // Get data from database
    const fetchProducts = async () => {
        const res = await fetch(`/api/products/search?searchText=` + query);
        const data = await res.json();
        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, [query, filter]);

    return (
        <>
            <div className="searchResult-header">
                <div className="searchResult-header-spacer"></div>
                <div className="searchResult-header-text">{query}</div>
            </div>
            <div className="searchResult-body">
                {products.length === 0 && <div>No Result...</div>}
                {products.map(product => (
                    <ProductCardV2 ID={product.id} ></ProductCardV2>
                ))}
            </div>
        </>
    )
}