import "./SettingPageNavButton.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SettingPageNavButtonProps {
    key: string;
    pageId: string;
    icon: string;
    text: string;
    router: string;
    isSelected?: boolean;
    onClick: () => void;
    setCurrentPage?: (page: string) => void;
}

export default function SettingPageNavButton(props: SettingPageNavButtonProps) {

    const router = useRouter();

    return (
        <div className={`navButton-root${props.isSelected ? " selected" : ""}`} onClick={() => {props.onClick(); props.setCurrentPage!(props.pageId)}}>
            {/* Download different color image to work with change color after isSeclted, SVG as React Compponent not working when deploy */}
            <Image src={props.icon} alt="button icon" width={24} height={24} className={`navButton-image${props.isSelected ? " selected" : ""}`}></Image>
            <div className="navButton-text">{props.text}</div>
        </div>
    )
}