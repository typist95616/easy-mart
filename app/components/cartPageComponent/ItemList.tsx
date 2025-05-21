import "./ItemList.scss";
import { useCart } from "@/app/Context/CartContext";
import ItemListProductCard from "./ItemListProductCard";
import orange from "../../../public/images/orange.png";

export default function ItemList() {

    const { cart, getTotalPrice } = useCart();


    return (
        <div className="ItemList-root">
            <div className="ItemList-header">Items Name</div>
            <div className="ItemList-items">
                {cart.map((item) => (
                    <ItemListProductCard id={item.id} productName={item.name} productPrice={item.price} productImage={item.img_url}></ItemListProductCard>
                ))}
            </div>
        </div>
    )
}