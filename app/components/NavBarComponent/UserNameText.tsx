import { useToken } from "@/app/Context/TokenContext";
import { User } from "@/app/types/User";
import { useEffect, useState } from "react";

export default function UserNameText() {

    const { token, setPageToken } = useToken();
    const [userInfo, setUserInfo] = useState<User>();

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
                    setUserInfo(data); // Store the fetched user info
                } else {
                    console.error('Failed to fetch user info', response.status);
                }
            }
            fetchUserInfo();
        }
    }, [token])

    return (
        <div className="user-name-text">
            <p>
                {token}
                {userInfo?.username}
            </p>
        </div>
    );
}