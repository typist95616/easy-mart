import "./EditNamePopUp.scss";
import Image from "next/image";
import CloseIcon from "@/public/images/close.png";

interface EditNamePopUpProps {
    setPopUpShow: (show: boolean) => void;
}

export default function EditNamePopUp(props: EditNamePopUpProps) {



    return (
        <div className="editNamePopUp-root">
            <div className="heading">
                <div className="heading-text">Edit</div>
                <Image src={CloseIcon} alt="close icon" className="heading-closeIcon" width={24} height={24} onClick={() => props.setPopUpShow(false)}></Image>
            </div>
            <div className="content">
                <div className="nameInput">
                    <div className="nameInput-text">Full Name</div>
                    <input type="text" className="nameInput-input"></input>
                </div>
                <div className="saveButton">
                    <div className="saveButton-text">Save</div>
                </div>
            </div>
        </div>
    )
}