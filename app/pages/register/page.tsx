"use client";

import "./main.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/easyMartLogo.png";
import EmailPage from "@/app/components/registerPageComponent/EmailPage";
import PasswordPage from "@/app/components/registerPageComponent/PasswordPage";
import { useState } from "react";
import SuccessfulPage from "@/app/components/registerPageComponent/SuccessfulPage";

export default function Home() {

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [email, setEmail] = useState("");

    return (
        <div className="registerPage-root">
            <div className="registerPage-header">
                <Link href="/pages/main">
                    <Image src={logo} alt="Logo" className="registerPage-header-logo"></Image>
                </Link>
            </div>
            <div className="registerPage-content">
                {currentPage === 1 && (
                    <EmailPage setCurrentPage={setCurrentPage} email={email} setEmail={setEmail}></EmailPage>
                )}
                {currentPage === 2 && (
                    <PasswordPage setCurrentPage={setCurrentPage} email={email}></PasswordPage>
                )}
                {currentPage === 3 && (
                    <SuccessfulPage setCurrentPage={setCurrentPage}></SuccessfulPage>
                )}
            </div>
        </div>
    )
}