import "./NavBarLoginButton.scss";
import Image from "next/image";
import loginImage from "../../../public/images/login.png"
// import clsx from "clsx";
// import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from "react";
import { User } from "@/app/types/User";
import { useRouter } from "next/navigation";

interface NavBarLoginButtonProps {
    className?: string;
}

export default function NavBarLoginButton(props: NavBarLoginButtonProps) {

    // useSession hook contains the user information if the user is logged in
    // status === 'authenticated' if logged in
    // const { data: session, status } = useSession();
    // console.log("Login button: " + session + " and " + status);

    return (
        <div className="navbar-loginButton-root">
            <Image src={loginImage} alt="login image" className="navbar-loginButton-image" />
            <div className="navbar-loginButton-text">Login</div>
        </div>
    )
}