import "./NavBarLoginButton.scss";
import Image from "next/image";
import loginImage from "../../../public/images/login.png"
import clsx from "clsx";
import { useSession, signOut } from 'next-auth/react';

interface NavBarLoginButtonProps {
    className?: string;
}

export default function NavBarLoginButton(props: NavBarLoginButtonProps) {

    // useSession hook contains the user information if the user is logged in
    // status === 'authenticated' if logged in
    const { data: session, status } = useSession();
    const handleLogout = () => {
        signOut();
    }

    console.log("Login button: " + session + " and " + status);

    return (
        <div className="navbar-loginButton-root">
            {status === "authenticated" ? (
                <div onClick={handleLogout}>
                    <div>{session.user?.name}</div>
                    <div>Log Out</div>
                </div>
            ) : (
                <>
                    <Image src={loginImage} alt="login image" className="navbar-loginButton-image" />
                    <div className="navbar-loginButton-text">Login</div>
                </>
            )}
        </div>
    )
}