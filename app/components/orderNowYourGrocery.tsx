import "./orderNowYourGrocery.css";
import ProductCard from "./SliderComponent/ProductCardV2";
import { useEffect, useRef, useState } from "react";
import { Product } from "../types/Product";
import orange from "../images/orange.png"

export default function OrderNowYourGrocery() {

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
        <div>
            <div className="whole-orderNow">
                <div className="prodcutCardGroup">
                    {products.slice(0, 3).map((product) => (
                        <ProductCard
                            productName={product.name}
                            productImage={orange}
                            pricePerLb={product.price_per_lb}
                            totalPrice={product.total_price}
                            stock={product.stock}
                        />
                    ))}
                </div>
                <div className="orderNow-spacer"></div>
                <div className="orderNow-text">
                    <div className="orderNow-discount">Get 10% OFF On Your First Order</div>
                    <div className="orderNow-orderNow">Order Now Your Grocery!</div>
                </div>
            </div>
        </div>
    )
}