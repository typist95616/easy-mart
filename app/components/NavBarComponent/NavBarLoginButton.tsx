import "./NavBarLoginButton.scss";
import Image from "next/image";
import loginImage from "../../../public/images/login.png"
import clsx from "clsx";

interface NavBarLoginButtonProps {
    className?: string;
}

export default function NavBarLoginButton(props: NavBarLoginButtonProps) {
    return (
        <div className="navbar-loginButton-root">
            <Image src={loginImage} alt="login image" className="navbar-loginButton-image" />
            <div className="navbar-loginButton-text">Login</div>
        </div>
    )
}