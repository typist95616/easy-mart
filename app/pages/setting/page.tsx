"use client"

import NavbarV2 from "@/app/components/NavBarV2";
import "./main.scss";
import FooterV2 from "@/app/components/FooterV2";
import SettingPageNavBar from "@/app/components/settingPageComponent/SettingPageNavBar";
import { useEffect, useState } from "react";
import SettingProfilePage from "@/app/components/settingPageComponent/SettingProfilePage";
import SettingOrderPage from "@/app/components/settingPageComponent/SettingOrderPage";
import SettingAddressPage from "@/app/components/settingPageComponent/SettingAddressPage";
import ComingSoon from "@/app/components/ComingSoon";
import EditNamePopUp from "@/app/components/settingPageComponent/EditNamePopUp";
import DropDownMessage from "@/app/components/DropDownMessage";

export default function Main() {

    const [currentPage, setCurrentPage] = useState("profile")
    const [popUpShow, setPopUpShow] = useState(false);
    const [popUpMessageShow, setPopUpMessageShow] = useState(false);

    const handleShow = () => {
        setPopUpMessageShow(!popUpMessageShow);
    }

    // disable scroll function when popup is shown
    useEffect(() => {
        if (popUpShow) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset"; // 恢復滾動
        }

        return () => {
            document.body.style.overflow = "unset"; // 清理時恢復滾動
        };
    }, [popUpShow]);

    return (
        <div className="settingPage-root">
            <NavbarV2 className="whole-navbar-v2" />
            <div className="settingPage-content">
                
                <div onClick={handleShow}>show</div>

                <div className="settingPage-content-left">
                    <SettingPageNavBar setCurrentPage={setCurrentPage} />
                    {/* Logout Button */}
                </div>
                <div className="settingPage-content-right">
                    {currentPage === "profile" && (
                        <SettingProfilePage setPopUpShow={setPopUpShow} />
                    )}
                    {currentPage === "order" && (
                        <SettingOrderPage />
                    )}
                    {currentPage === "address" && (
                        <SettingAddressPage />
                    )}
                    {(currentPage === "payment" || currentPage === "notification" || currentPage === "refer" || currentPage === "coupon" || currentPage === "receipt" || currentPage === "setting" || currentPage === "info") && (
                        <ComingSoon />
                    )}
                </div>
            </div>
            <FooterV2 />
            {popUpShow && (
                <>
                    <div className="overlay-background"></div>
                    <EditNamePopUp setPopUpShow={setPopUpShow}></EditNamePopUp>
                </>
            )}
            {popUpMessageShow && (
                <DropDownMessage />
            )}
        </div>
    )
}