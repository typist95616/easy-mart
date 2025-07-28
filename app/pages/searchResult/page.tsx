"use client";

import "./main.scss";
import NavbarV2 from "../../components/NavBarV2";
import FooterV2 from "../../components/FooterV2";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Product } from "@/app/types/Product";
import ProductCardV2 from "../../components/SliderComponent/ProductCardV2";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Main() {

    return (
        <div>
            <NavbarV2 className="whole-navbar-v2"></NavbarV2>
            <div className="searchResult-root">
            <Suspense fallback={<div>Loading...</div>}>
                <SearchResultContent></SearchResultContent>
            </Suspense>
            </div>
            <FooterV2></FooterV2>
        </div>
    )
}

const useSearchProductQuery = (query: string) => {
    return useQuery({
        queryKey: ["products", query],
        queryFn: async () => {
            const res = await fetch(`/api/products/search?searchText=` + query);
            if(!res.ok){
                throw new Error("Failed to fetch products");
            }
            return res.json();
        }
    });
}

function SearchResultContent() {

    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";
    // const [message, setMessage] = useState("Loading...");

    // const [filter, setFilter] = useState([]);
    // const [products, setProducts] = useState<Product[]>([]);

    // Get data from database
    // const fetchProducts = async () => {
    //     const res = await fetch(`/api/products/search?searchText=` + query);
    //     if(!res.ok){
    //         setMessage("Something went wrong...");
    //         return;
    //     }
    //     const data = await res.json();
    //     if(data.length === 0) {
    //         setMessage("No result...");
    //         setProducts([]);
    //     } else {
    //         setProducts(data);
    //         setMessage("");
    //     }
    // }

    // useEffect(() => {
    //     setMessage("Loading...");
    //     fetchProducts();
    // }, [query, filter]);

    const queryResult = useSearchProductQuery(query);
    const products: Product[] = queryResult.data || [];

    return (
        <>
            <div className="searchResult-header">
                <div className="searchResult-header-spacer"></div>
                <div className="searchResult-header-text">Search Results: {query}</div>
            </div>
            <div className="searchResult-body">
                {queryResult.isLoading && <div>Loading...</div>}
                {queryResult.error && <div>{queryResult.error.message}</div>}
                {queryResult.isSuccess && products.length === 0 && <div>No result...</div>}
                {products.length > 0 && products.map(product => (
                    <ProductCardV2 ID={product.id} ></ProductCardV2>
                ))}
            </div>
        </>
    )
}