import "./navbarCart.css"
import cartIcon from "../../public/images/cart.svg";
import Image from "next/image";

export default function NavbarCart() {

    return (
        <div>
            <div className="navbar-cart">
                <div className="navbar-cart-logoItem">
                    <Image src={cartIcon} alt="cart Icon" className="navbar-cart-logo"></Image>
                    <label className="navbar-cart-item">14</label>
                </div>
                <label className="navbar-cart-text">Cart</label>
            </div>
        </div>
    )

}