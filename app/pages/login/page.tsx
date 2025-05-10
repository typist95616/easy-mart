"use client";

import "./main.css";
import Image from "next/image";
import logo from "../../images/easyMartLogo.png";
import Link from "next/link";
import sms from "../../../public/images/sms.svg";
import call from "../../../public/images/call.svg";
import buttonArrow from "../../../public/images/login-arrow-right.svg";
import metaLogo from "../../../public/images/meta-logo.svg";
import googleLogo from "../../../public/images/google-logo.svg";

export default function Home() {

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
                            <Image src={sms} alt="sms logo" className="login-emailLogo"></Image>
                            <div className="login-emailText">Email</div>
                        </div>
                        <div className="login-phoneButton">
                            <Image src={call} alt="call logo" className="login-phoneLogo"></Image>
                            <div className="login-phoneText">Phone</div>
                        </div>
                    </div>
                    {/* Need to check email or phone */}
                    {/* if Email */}
                    <div className="login-getEmail">
                        <div className="login-getEmail-text">Email</div>
                        <input placeholder="  Enter your email" className="login-getEmail-input"></input>
                    </div>
                    <button className="login-contiune-button">
                        <div className="login-contiune-button-text">Contiune</div>
                        <Image src={buttonArrow} alt="login-arrow"></Image>
                    </button>
                </div>
                <div className="login-divider">
                    <div className="divider"></div>
                    <div className="divider-text"> Or </div>
                    <div className="divider"></div>
                </div>
                <Link href={"http://accountscenter.meta.com/"}>
                    <div className="loginButton-meta">
                        <Image src={metaLogo} alt="meta Logo"></Image>
                        <div className="loginButton-meta-text">Sign in with Meta</div>
                    </div>
                </Link>
                <Link href="https://accounts.google.com/">
                    <div className="loginButton-google">
                        <Image src={googleLogo} alt="google logo"></Image>
                        <div className="loginButton-google-text">Sign in with Google</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}