import { useEffect, useState } from "react";
import ProductSlider from "../SliderComponent/ProductSlider";
import "./Recommendations.scss";
import { Product } from "@/app/types/Product";
import ProductCardV2 from "../SliderComponent/ProductCardV2";
import clsx from "clsx";

interface RecommendationsProps {
    className?: string;
}

export default function Recommendations(props: RecommendationsProps) {

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
        <div className={clsx("recommendations-root", props.className)}>
            <ProductSlider 
                title="Recommendations" 
                className="recommendations-desktop"
                settings={{
                    dots: false,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    initialSlide: 0,
                    arrows: false,

                    responsive: [
                        {
                            breakpoint: 1400,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                            }
                        },
                        {
                            breakpoint: 1150,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                            }
                        },
                        {
                            breakpoint: 900,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                            }
                        }
                    ]
                }}
                ></ProductSlider>
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