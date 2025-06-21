"use client";

import "./main.css";
import Image from "next/image";
import logo from "../../images/easyMartLogo.png";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToken } from "../../Context/TokenContext";
import { useCurrentUser } from "../../Context/CurrentUserContext";
import { useAddress } from "@/app/Context/AddressContext";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const [{ hello }, setABC] = useState({ hello: "world" });
    

    const { token, setPageToken } = useToken();
    const { currentUser, setCurrentUserToLocal } = useCurrentUser();
    const { currentAddress, setCurrentAddress, addAddressToListAfterLogin } = useAddress();
    const router = useRouter();

    const isValidEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Check if input is not empty
        if(!email || !password){
            setError("Please fill in all fields!");
            return;
        }

        if(!isValidEmail(email)) {
            setError("Please enter value email");
            return;
        }

        try {
            const res = await fetch('/api/login', {
                method: 'POST', // Specify POST method
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON
                },
                body: JSON.stringify({ email, password }), // Include email and password
            });

            if (!res.ok) {
                const errorResponse = await res.json();
                setError(errorResponse.error); // Handle non-200 responses
                throw new Error(errorResponse.error);
            }

            const data = await res.json();

            // add token to local storage
            setPageToken(data.token);
            setCurrentUserToLocal(data.user);

            // get user address from db and set to currentaddress
            const getAddress = await fetch('/api/getUserInfo', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${data.token}`,
                }
            })

            if (getAddress.ok) {
                const data = await getAddress.json();
                setCurrentAddress(data.address);
                addAddressToListAfterLogin(Array.isArray(data.address) ? data.address : [data.address]);
            } else {
                console.log("error when getting address: " + getAddress);
            }

            console.log("User: ", JSON.stringify(data.user, null, 2));
            router.push('/pages/main');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="whole-loginPage">
            <div className="login-header">
                <Link href="/pages/main">
                    <Image src={logo} alt="Logo" className="loginPage-logo"></Image>
                </Link>
            </div>
            <div className="login-content">
                <div className="login-content-header">Login</div>
                <div className="login-form">
                    <div className="email-phone-button">
                        <div className="login-emailButton">
                            <Image src="/images/sms.svg" alt="sms logo" className="login-emailLogo" width={24} height={24} />
                            <div className="login-emailText">Email</div>
                        </div>
                        <div className="login-phoneButton">
                            <Image src="/images/call.svg" alt="call logo" className="login-phoneLogo" width={24} height={24} />
                            <div className="login-phoneText">Phone</div>
                        </div>
                    </div>
                    {/* Need to check email or phone */}
                    {/* if Email */}
                    <div className="login-getEmail" onChange={(e) => setEmail((e.target as HTMLInputElement).value)}>
                        <div className="login-getEmail-text">Email</div>
                        <input placeholder="  Enter your email" className="login-getEmail-input"></input>
                    </div>
                    <div className="login-getPassword" onChange={(e => setPassword((e.target as HTMLInputElement).value))}>
                        <div className="login-getPassword-text">Password</div>
                        <input placeholder="  Enter your password" className="login-getPassword-input"></input>
                    </div>
                    <div className="login-errorText">{error}</div>
                    <button className="login-contiune-button" onClick={handleLogin}>
                        <div className="login-contiune-button-text">Contiune</div>
                        <Image src="/images/login-arrow-right.svg" alt="login-arrow" width={24} height={24} />
                    </button>
                    <div className="directToRegister">
                        <div className="directToRegsiter-text">Don't have an account? <Link href={"/pages/register"}><span className="directToRegister-button">Register</span></Link></div>
                    </div>
                </div>
                <div className="login-divider">
                    <div className="divider"></div>
                    <div className="divider-text"> Or </div>
                    <div className="divider"></div>
                </div>
                <Link href={"http://accountscenter.meta.com/"}>
                    <div className="loginButton-meta">
                        <Image src="/images/meta-logo.svg" alt="meta Logo" width={24} height={24} />
                        <div className="loginButton-meta-text">Sign in with Meta</div>
                    </div>
                </Link>
                <div className="loginButton-google" onClick={() => signIn("google")}>
                    <Image src="/images/google-logo.svg" alt="google logo" width={24} height={24} />
                    <div className="loginButton-google-text">Sign in with Google</div>
                </div>
            </div>
        </div>
    )
}