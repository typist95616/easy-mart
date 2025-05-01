import { useEffect, useState } from "react";
import "../components/trendingFavorites.css"
import { Product } from "../types/Product";
import ProductCard from "./productCard";
import apple from "../images/apple.png";

export default function TrendingFavorites() {

    const [products, setProducts] = useState<Product[]>([]);
    const [filter, setFilter] = useState([]);

    const fetchProducts = async () => {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, [filter]);
    
    return (
        <div className="whole-trendingBox">
            <h1>Trending Favorites</h1>
            <div className="productSlider-slider">
                {products.map((product) => 
                    <ProductCard 
                        productName={product.name}
                        productImage={apple}
                        pricePerLb={product.price_per_lb}
                        totalPrice={product.total_price}
                        stock={product.stock}
                    />
                )}
            </div>
        </div>
    )
}