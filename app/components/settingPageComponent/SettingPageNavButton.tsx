import "./SettingPageNavButton.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SettingPageNavButtonProps {
    key: string;
    icon: string;
    text: string;
    router: string;
    isSelected?: boolean; 
    onClick: () => void;
}

export default function SettingPageNavButton(props: SettingPageNavButtonProps) {

    const router = useRouter();

    return (
        <div className={`navButton-root${props.isSelected ? " selected" : ""}`} onClick={() => props.onClick()}>
            <Image src={props.icon} alt="button icon" width={24} height={24}></Image>
            <div className="navButton-text">{props.text}</div>
        </div>
    )
}