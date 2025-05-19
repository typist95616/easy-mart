import { useEffect, useState } from "react";
import ProductSlider from "../SliderComponent/ProductSlider";
import "./Recommendations.scss";
import { Product } from "@/app/types/Product";
import ProductCardV2 from "../SliderComponent/ProductCardV2";

export default function Recommendations() {

    const [products, setProducts] = useState<Product[]>([]);
    const [filter, setFilter] = useState([]);

    // Get data from database
    const fetchProducts = async () => {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, [filter]);

    return (
        <div className="recommendations-root">
            <ProductSlider title="Recommendations" className="recommendations-desktop"></ProductSlider>
            <div className="recommendations-mobile">
                <div className="recommendations-mobile-header">Recommendations</div>
                <div className="recommendations-mobile-slider">
                    {products.slice(0, 6).map((product, index) => (
                        <ProductCardV2 ID={product.id}></ProductCardV2>
                    ))}
                </div>
            </div>
        </div>
    )
}