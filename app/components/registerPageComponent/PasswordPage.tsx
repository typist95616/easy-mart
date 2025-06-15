import "./PasswordPage.scss";
import Image from "next/image";
import leftArrow from "../../../public/images/popup-leftArrow.png";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface passwordPageProps {
    setCurrentPage: (page: number) => void;
    email: string;
}

export default function PasswordPage(props: passwordPageProps) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async () => {
        setError("");

        if(!username || !password){
            setError("Please enter both your username and password!");
            return;
        }

        try {
            const res = await fetch('/api/register', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ email: props.email, username, password })
            });

            const data = await res.json();

            // res.ok is a boolean value, if status between 200 and 299 = true, else = false
            if (!res.ok) {
                setError(data.error || 'Registration failed, please try again.')
            } else {
                console.log('Registration successful!', data.user);
            }
        } catch (error) {
            console.error('Client-side registration error:', error);
            setError('An unexpected error, please try again later.');
        }
        props.setCurrentPage(3);
    }

    return (
        <div className="passwordPage-root">
            <div className="passwordPage-previousPageButton" onClick={() => props.setCurrentPage(1)}>
                <div className="passwordPage-previousPageButton-border">
                    <Image src={leftArrow} alt="left Arrow" className="passwordPage-previousPageButton-image"></Image>
                </div>
            </div>
            <div className="passwordPage-header">Create UserName & Password</div>
            <div className="passwordPage-form">
                <div className="passwordPage-getUsername">
                    <div className="passwordPage-getUsername-text">Username</div>
                    <input className="passwordPage-getUsername-input" placeholder="Username" value={username} onChange={(e) => setUsername((e.target as HTMLInputElement).value)}></input>
                </div>
                <div className="passwordPage-getPassword">
                    <div className="passwordPage-getPassword-text">Password</div>
                    <input className="passwordPage-getPassword-input" placeholder="Password" value={password} onChange={(e) => setPassword((e.target as HTMLInputElement).value)}></input>
                </div>
                <div className="passwordPage-errorText">{error}</div>
                <div className="passwordPage-contiuneButton" onClick={handleRegister}>
                    <div className="passwordPage-continueButton-text">Register</div>
                </div>
            </div>
        </div>
    )
}