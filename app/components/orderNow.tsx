// import { useEffect, useState } from "react";
// import "./orderNow.css";
// import { Product } from "../types/Product";
// import ProductCard from "./SliderComponent/ProductCardV2";
// import orange from "../images/orange.png";
// import orderNowArrow from "../images/orderNow-arrow.png";
// import Image from "next/image";

// export default function OrderNow() {

//     const [products, setProducts] = useState<Product[]>([]);
//     const [filter, setFilter] = useState([]);

//     const fetchProducts = async () => {
//         const res = await fetch('/api/products');
//         const data = await res.json();
//         setProducts(data);
//     }

//     useEffect(() => {
//         fetchProducts();
//     }, [filter]);

//     return (
//         <div>
//             <div className="whole-secondOrderNow">
//                 <div className="prodcutCardGroup">
//                     {products.slice(0, 3).map((product) => (
//                         <ProductCard
//                             productName={product.name}
//                             productImage={orange}
//                             pricePerLb={product.price_per_lb}
//                             totalPrice={product.total_price}
//                             stock={product.stock}
//                         />
//                     ))}
//                 </div>
//                 <div className="orderNow-spacer"></div>
//                 <div className="orderNow-text">
//                     <div className="orderNow-discount">Get 10% OFF On Your First Order</div>
//                     <div className="orderNow-orderNow">Order Now Your Grocery!</div>
//                     <div className="orderNow-description">
//                         <div className="orderNow-item">
//                             <div className="orderNow-number">1K+</div>
//                             <div className="orderNow-text">Items</div>
//                         </div>
//                         <div className="orderNow-min">
//                             <div className="orderNow-number">20</div>
//                             <div className="orderNow-text">Minutes</div>
//                         </div>
//                         <div className="orderNow-offer">
//                             <div className="orderNow-number">30%</div>
//                             <div className="orderNow-text">Up to offers</div>
//                         </div>
//                     </div>
//                     <div className="orderNow-buttonRow">
//                         <div className="orderNow-button">
//                             <div className="orderNow-button-text">Order Now</div>
//                             <Image src={orderNowArrow} alt="order now button" className="orderNow-button-image"/>
//                         </div>
//                         <div className="orderNow-spacer"></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }