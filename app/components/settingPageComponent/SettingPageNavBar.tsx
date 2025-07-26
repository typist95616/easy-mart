"use client";

import { useCurrentUser } from "@/app/Context/CurrentUserContext";
import "./SettingPageNavBar.scss";
import Image from "next/image";
import SettingPageNavButton from "./SettingPageNavButton";

import { useState } from "react";

interface SettingPageNavBarProps {
    setCurrentPage?: (page: string) => void;
}

export default function SettingPageNavBar(props: SettingPageNavBarProps) {

    const { currentUser } = useCurrentUser();
    const [selectedKey, setSelectedKey] = useState<string>("profile")

    return (
        <div className="settingPageNavBar-root">
            <div className="settingPageNavBar-userInfo">
                {currentUser ? (
                    <>
                        <Image src={currentUser!.img_url} alt="profile icon" width={48} height={48}></Image>
                        <div className="settingPageNavBar-userInfo-name">{currentUser!.username}</div>
                    </>
                ) : (
                    <>
                        {/* insert Skeleton here */}
                    </>
                )}
            </div>
            <div className="settingPageNavBar-navButtons">
                <SettingPageNavButton key="profile" pageId="profile" icon={"/images/setting-user.svg"} text={"Account Details"} router={""} isSelected={selectedKey === "profile"} onClick={() => setSelectedKey("profile")} setCurrentPage={props.setCurrentPage}></SettingPageNavButton>
                <SettingPageNavButton key="order" pageId="order" icon={"/images/setting-order.png"} text={"My Orders"} router={""} isSelected={selectedKey === "order"} onClick={() => setSelectedKey("order")} setCurrentPage={props.setCurrentPage}></SettingPageNavButton>
                <SettingPageNavButton key="address" pageId="address" icon={"/images/setting-location.png"} text={"My Addresses"} router={""} isSelected={selectedKey === "address"} onClick={() => setSelectedKey("address")} setCurrentPage={props.setCurrentPage}></SettingPageNavButton>
                <SettingPageNavButton key="payment" pageId="payment" icon={"/images/setting-card.png"} text={"My Payments"} router={""} isSelected={selectedKey === "payment"} onClick={() => setSelectedKey("payment")} setCurrentPage={props.setCurrentPage}></SettingPageNavButton>
                <SettingPageNavButton key="notification" pageId="notification" icon={"/images/setting-bell.png"} text={"Notification Setting"} router={""} isSelected={selectedKey === "notification"} onClick={() => setSelectedKey("notification")} setCurrentPage={props.setCurrentPage}></SettingPageNavButton>
                <SettingPageNavButton key="refer" pageId="refer" icon={"/images/setting-gift.png"} text={"Refer Friends"} router={""} isSelected={selectedKey === "refer"} onClick={() => setSelectedKey("refer")} setCurrentPage={props.setCurrentPage}></SettingPageNavButton>
                <SettingPageNavButton key="coupon" pageId="coupon" icon={"/images/setting-coupon.png"} text={"Coupons"} router={""} isSelected={selectedKey === "coupon"} onClick={() => setSelectedKey("coupon")} setCurrentPage={props.setCurrentPage}></SettingPageNavButton>
                <SettingPageNavButton key="receipt" pageId="receipt" icon={"/images/setting-receipt.png"} text={"My Receipt"} router={""} isSelected={selectedKey === "receipt"} onClick={() => setSelectedKey("receipt")} setCurrentPage={props.setCurrentPage}></SettingPageNavButton>
                <div className="settingPageNavBar-navButtons-divider"></div>
                <SettingPageNavButton key="setting" pageId="setting" icon={"/images/setting-setting.png"} text={"Acount Setting"} router={""} isSelected={selectedKey === "setting"} onClick={() => setSelectedKey("setting")} setCurrentPage={props.setCurrentPage}></SettingPageNavButton>
                <SettingPageNavButton key="info" pageId="info" icon={"/images/setting-info.png"} text={"Help Center"} router={""} isSelected={selectedKey === "info"} onClick={() => setSelectedKey("info")} setCurrentPage={props.setCurrentPage}></SettingPageNavButton>
            </div>
        </div>
    )
}