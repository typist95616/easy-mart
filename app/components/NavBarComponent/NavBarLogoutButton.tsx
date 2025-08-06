import { useEffect, useState } from "react";
import "./NavBarLogoutButton.scss"
import { User } from "@/app/types/User";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/app/Context/CurrentUserContext";
import { useTokenAtom } from "../../Context/TokenAtom";
import Image from "next/image";
import { useAddress } from "@/app/Context/AddressQuery";
import PopUpMyAccount from "./PopUpMyAccount"
import { clear } from "console";

export default function NavBarLogoutButton() {

    const [userInfo, setUserInfo] = useState<User>();
    const { currentUser, setCurrentUserToLocal } = useCurrentUser();
    const router = useRouter();
    const { token, setToken } = useTokenAtom();
    const { currentAddress, setCurrentAddress, clear: clearCache } = useAddress();
    const [showPopUp, setShowPopUp] = useState(false);

    const togglePopUp = () => {
        setShowPopUp(!showPopUp);
    }

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logOut', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON
                },
                body: JSON.stringify({ email: userInfo?.email }),
            });

            if (response.ok) {
                // Handle successful logout if needed
                console.log('Logged out successfully');
                setToken(undefined);
                localStorage.removeItem("token");
                setCurrentUserToLocal(undefined);
                clearCache();
                router.push('/pages/main');
            } else {
                console.error('Failed to log out', response.status);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (token) {
            const fetchUserInfo = async () => {
                const response = await fetch('/api/getUserInfo', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })

                if (response.ok) {
                    const data = await response.json();
                    console.log("data: " + data)
                    setUserInfo(data); // Store the fetched user info
                } else {
                    console.error('Failed to fetch user info', response.status);
                }
            }
            fetchUserInfo();
        }
    }, [token])

    return (
        <div className="logout-button-root" onClick={togglePopUp}>
            <div className="logout-button-border">
                <Image src={currentUser?.img_url || "/images/orange.png"} alt="profile" width={20} height={20}></Image>
                <div className="logout-button-userName">{currentUser?.username}</div>
            </div>
            {showPopUp && (
                <div className="my-account-popup">
                    <PopUpMyAccount handleLogout={handleLogout}></PopUpMyAccount>
                </div>
            )}
        </div>
    )
}

