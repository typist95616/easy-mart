"use client"

import NavbarV2 from "@/app/components/NavBarV2";
import "./main.scss";
import FooterV2 from "@/app/components/FooterV2";
import SettingPageNavBar from "@/app/components/settingPageComponent/SettingPageNavBar";
import { useState } from "react";
import SettingProfilePage from "@/app/components/settingPageComponent/SettingProfilePage";
import SettingOrderPage from "@/app/components/settingPageComponent/SettingOrderPage";
import SettingAddressPage from "@/app/components/settingPageComponent/SettingAddressPage";

export default function Main() {

    const [currentPage, setCurrentPage] = useState("profile")

    return (
        <div className="settingPage-root">
            <NavbarV2 className="whole-navbar-v2" />
            <div className="settingPage-content">
                <div className="settingPage-content-left">
                    <SettingPageNavBar setCurrentPage={setCurrentPage} />
                    {/* Logout Button */}
                </div>
                <div className="settingPage-content-right">
                    {currentPage === "profile" && (
                        <SettingProfilePage />
                    )}
                    {currentPage === "order" && (
                        <SettingOrderPage />
                    )}
                    {currentPage === "address" && (
                        <SettingAddressPage />
                    )}
                </div>
            </div>
            <FooterV2 />
        </div>
    )
}