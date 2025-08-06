import "./EditNamePopUp.scss";
import Image from "next/image";
import CloseIcon from "@/public/images/close.png";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/app/Context/CurrentUserContext";
import { User } from "@/app/types/User";

interface EditNamePopUpProps {
    setPopUpShow: (show: boolean) => void;
}

export default function EditNamePopUp(props: EditNamePopUpProps) {

    const [nameInput, setNameInput] = useState("");
    const { currentUser, setCurrentUser } = useCurrentUser();

    useEffect(() => {
        if (currentUser?.username) {
            setNameInput(currentUser.username);
        }
    }, [currentUser]);

    const updateUserName = async (newName: string) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch('/api/editName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name: newName })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to update name");
            }
        } catch (error) {
            console.error("Error updating user name:", error);
        }
        setCurrentUser({
            ...currentUser,
            username: newName
        } as User);
        props.setPopUpShow(false);
    }

    return (
        <div className="editNamePopUp-root">
            <div className="heading">
                <div className="heading-text">Edit</div>
                <Image src={CloseIcon} alt="close icon" className="heading-closeIcon" width={24} height={24} onClick={() => props.setPopUpShow(false)}></Image>
            </div>
            <div className="content">
                <div className="nameInput">
                    <div className="nameInput-text">Full Name</div>
                    <input type="text" className="nameInput-input" value={nameInput} onChange={(e) => { setNameInput(e.target.value) }}></input>
                </div>
                <div className="saveButton" onClick={() => updateUserName(nameInput)}>
                    <div className="saveButton-text">Save</div>
                </div>
            </div>
        </div>
    )
}