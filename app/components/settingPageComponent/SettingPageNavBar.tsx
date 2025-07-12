"use client";

import { useCurrentUser } from "@/app/Context/CurrentUserContext";
import "./SettingPageNavBar.scss";
import Image from "next/image";
import SettingPageNavButton from "./SettingPageNavButton";

// NavButton Icon
import User from "@/public/images/setting-user.png";
import Receipt from "@/public/images/setting-receipt.png";
import Coupon from "@/public/images/setting-coupon.png";
import Gift from "@/public/images/setting-gift.png";
import Bell from "@/public/images/setting-bell.png";
import Card from "@/public/images/setting-card.png";
import Location from "@/public/images/setting-location.png";
import Cart from "@/public/images/setting-cart.png";
import Order from "@/public/images/setting-order.png";
import { useState } from "react";

export default function SettingPageNavBar() {

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
                <SettingPageNavButton key="profile" icon={"/images/setting-user.png"} text={"Account Details"} router={""} isSelected={selectedKey === "profile"} onClick={() => setSelectedKey("profile")}></SettingPageNavButton>
                <SettingPageNavButton key="order" icon={"/images/setting-order.png"} text={"My Orders"} router={""} isSelected={selectedKey === "order"} onClick={() => setSelectedKey("order")}></SettingPageNavButton>
            </div>
        </div>
    )
}