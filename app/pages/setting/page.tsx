import NavbarV2 from "@/app/components/NavBarV2";
import "./main.scss";
import FooterV2 from "@/app/components/FooterV2";
import SettingPageNavBar from "@/app/components/settingPageComponent/SettingPageNavBar";

export default function Main() {
     
    return (
        <div className="settingPage-root">
            <NavbarV2 className="whole-navbar-v2"/>
            <div className="settingPage-content">
                <SettingPageNavBar />
            </div>
            <FooterV2 />
        </div>
    )
}