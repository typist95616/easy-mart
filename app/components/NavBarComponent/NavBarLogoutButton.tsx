import { useEffect, useState } from "react";
import "./NavBarLogoutButton.scss"
import { User } from "@/app/types/User";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/app/Context/CurrentUserContext";
import { useTokenAtom } from "../../Context/TokenAtom";
import Image from "next/image";

export default function NavBarLogoutButton() {

    const [userInfo, setUserInfo] = useState<User>();
    // const { token, clearToken } = useToken();
    const { currentUser, setCurrentUserToLocal } = useCurrentUser();
    const router = useRouter();
    // const [tokenValue, setToken] = useAtom(tokenAtom);
    const { token , setToken } = useTokenAtom();

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
                // clearToken();
                setToken(undefined);
                localStorage.removeItem("token");
                setCurrentUserToLocal(undefined);
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
            console.log("current token:" + token);
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
        <div className="logout-button-root">
            <div className="logout-button-border" onClick={handleLogout}>
                <Image src={userInfo?.img_url || "/images/orange.png"} alt="profile" width={20} height={20}></Image>
                <div className="logout-button-userName">{userInfo?.username}</div>
                <div className="logout-button-logoutText">Log Out</div>
            </div>
        </div>
    )
}

