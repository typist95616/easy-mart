import { useCurrentUser } from "@/app/Context/CurrentUserContext";
import "./PopUpMyAccount.scss";
import Image from "next/image";
import Crown from "@/public/images/crown.png";
import Gift from "@/public/images/gift.png";
import { useRouter } from "next/navigation";

interface PopUpMyAccountProps {
    handleLogout: () => void;
}

export default function PopUpMyAccount(props: PopUpMyAccountProps) {

    const { currentUser } = useCurrentUser();
    const router = useRouter();

    return (
        <div className="popUpMyAccount-root">
            <div className="popUpMyAccount-userInfo">
                <Image src={currentUser!.img_url} alt="user profile icon" width={48} height={48}></Image>
                <div className="popUpMyAccount-userInfo-nameAndMember">
                    <div className="popUpMyAccount-userInfo-nameAndMember-name">{currentUser?.username}</div>
                    <div className="popUpMyAccount-userInfo-nameAndMember-member">
                        <Image src={Crown} alt="membership icon" className="popUpMyAccount-userInfo-nameAndMember-member-icon"></Image>
                        <div className="popUpMyAccount-userInfo-nameAndMember-member-text">Silver</div>
                    </div>
                </div>
                <div className="popUpMyAccount-userInfo-point">
                    <Image src={Gift} alt="point icon" className="popUpMyAccount-userInfo-point-icon"></Image>
                    <div className="popUpMyAccount-userInfo-point-text">2324 Points</div>
                </div>
            </div>
            {/* <div className="popUpMyAccount-actions">

            </div> */}
            <div className="popUpMyAccount-setting">
                <div className="popUpMyAccount-setting-setting" onClick={() => {
                    router.push("./setting")
                }}>Account Setting</div>
                <div className="popUpMyAccount-setting-logout" onClick={props.handleLogout}>LogOut</div>
            </div>
        </div>
    )
}