import "./EmailPage.scss";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface emailPageProps {
    setCurrentPage: (page: number) => void;
    email: string;
    setEmail: (email: string) => void;
}

export default function EmailPage(props: emailPageProps) {

    const [error, setError] = useState("");

    const isValidEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailCheck = async () => {
        setError("");

        if(!props.email) {
            setError("Please enter your email!");
            return;
        }

        if(!isValidEmail(props.email)){
            setError("Please enter a valid email!");
            return;
        }

        const res = await fetch("/api/checkEmail", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: props.email})
        });
        const data = await res.json();
        console.log("result " + data.exist);
        if(data.exist) {
            setError("Email already exisit");
            console.log(error);
        } else {
            props.setCurrentPage(2);
        }
    }
 
    return (
        <div>
            <div className="registerPage-registerForm">
                <div className="registerPage-registerForm-header">Sign Up</div>
                <div className="registerPage-emailOrPhone">
                    <div className="registerPage-emailOrPhone-emailButton">
                        <Image src="/images/sms.svg" alt="sms logo" className="registerPage-emailOrPhone-emailButton-emailLogo" width={24} height={24} />
                        <div className="registerPage-emailOrPhone-emailButton-emailText">Email</div>
                    </div>
                    <div className="registerPage-emailOrPhone-phoneButton">
                        <Image src="/images/call.svg" alt="call logo" className="registerPage-emailOrPhone-phoneButton-phoneLogo" width={24} height={24} />
                        <div className="registerPage-emailOrPhone-phoneButton-phoneText">Phone</div>
                    </div>
                </div>
                <div className="registerPage-getEmail">
                    <div className="registerPage-getEmail-text">Email</div>
                    <input className="registerPage-getEmail-input" value={props.email} placeholder="Enter your email" onChange={(e) => props.setEmail((e.target as HTMLInputElement).value)}></input>
                </div>
                <div className="registerPage-contiuneButton" onClick={handleEmailCheck}>
                    <div className="registerPage-continueButton-text">Continue</div>
                </div>
                <div className="registerPage-errorMessage">{error}</div>
                <div className="registerPage-directToLogin">Already have an account? <Link href={"/pages/login"}><span className="registerPage-directToLogin-button">Login</span></Link></div>
            </div>
        </div>
    )
}