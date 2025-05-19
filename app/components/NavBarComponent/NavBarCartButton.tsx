import "./NavBarCartButton.scss";
import Image from "next/image";
import cartIcon from "../../../public/images/cart.png";
import cartWhiteIcon from "../../../public/images/cartWhite.png";
import clsx from "clsx";
import { useCart } from "../../Context/CartContext";

interface NavBarCartButtonProps {
    className?: string;
}

export default function NavBarCartButton(props: NavBarCartButtonProps) {

    const { getTotalQuantity } = useCart();

    return (
        <div className="navbar-cartButton-root">
            <div className="navbar-cart">
                <div className="navbar-cart-imageStock">
                    <Image src={cartIcon} alt="cart Icon" className="navbar-cart-image"></Image>
                    <Image src={cartWhiteIcon} alt="cart Icon" className="navbar-cartWhite-image"></Image>
                    <label className="navbar-cart-stock">{getTotalQuantity()}</label>
                </div>
                <label className="navbar-cart-text">Cart</label>
            </div>
        </div>
    )
}