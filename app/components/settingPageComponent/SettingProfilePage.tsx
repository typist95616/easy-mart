import { useCurrentUser } from "@/app/Context/CurrentUserContext";
import "./SettingProfilePage.scss";
import Image from "next/image";
import Edit from "@/public/images/edit.png";

interface SettingProfilePageProps {
    setPopUpShow: (show: boolean) => void;
}

export default function SettingProfilePage(props: SettingProfilePageProps) {

    const { currentUser } = useCurrentUser();
    
    return (
        <>
            <div className="settingProfilePage-root">
                <div className="settingProfilePage-title">Account Details</div>
                <div className="settingProfilePage-nameBox">
                    <div className="settingProfilePage-nameBox-left">
                        <div className="settingProfilePage-nameBox-left-title">Full Name</div>
                        <div className="settingProfilePage-nameBox-left-name">{currentUser?.username}</div>
                    </div>
                    <div className="settingProfilePage-nameBox-editButton" onClick={() => props.setPopUpShow(true)}>
                        <Image src={Edit} alt="edit icon" width={22} height={22}></Image>
                        <div className="settingProfilePage-nameBox-editButton-text">Edit</div>
                    </div>
                </div>
                <div className="settingProfilePage-emailBox">
                    <div className="settingProfilePage-emailBox-left">
                        <div className="settingProfilePage-emailBox-left-title">Email Address</div>
                        <div className="settingProfilePage-emailBox-left-name">{currentUser?.email}</div>
                    </div>
                </div>
            </div>
        </>

    )
} 