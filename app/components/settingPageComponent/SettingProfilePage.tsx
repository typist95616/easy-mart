import { useCurrentUser } from "@/app/Context/CurrentUserContext";
import "./SettingProfilePage.scss";
import Image from "next/image";
import Edit from "@/public/images/edit.png";

export default function SettingProfilePage() {

    const { currentUser } = useCurrentUser();

    return (
        <div className="settingProfilePage-root">
            <div className="settingProfilePage-title">Account Details</div>
            <div className="settingProfilePage-nameBox">
                <div className="settingProfilePage-nameBox-left">
                    <div className="settingProfilePage-nameBox-left-title">Full Name</div>
                    <div className="settingProfilePage-nameBox-left-name">{currentUser?.username}</div>
                </div>
                <div className="settingProfilePage-nameBox-editButton">
                    <Image src={Edit} alt="edit icon" width={22} height={22}></Image>
                    <div className="settingProfilePage-nameBox-editButton-text">Edit</div>
                </div>
            </div>
            <div className="settingProfilePage-emailBox">
                <div className="settingProfilePage-emailBox-left">
                    <div className="settingProfilePage-emailBox-left-title">Email Address</div>
                    <div className="settingProfilePage-emailBox-left-name">{currentUser?.email}</div>
                </div>
                <div className="settingProfilePage-emailBox-editButton">
                    <Image src={Edit} alt="edit icon" width={22} height={22}></Image>
                    <div className="settingProfilePage-emailBox-editButton-text">Edit</div>
                </div>
            </div>
        </div>
    )
} 