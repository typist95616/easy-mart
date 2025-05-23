import "./SingleSuggestion.scss";
import location from "../../../public/images/suggestion-location.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suggestion } from "@/app/types/Suggestion";

interface singleSuggestionProps {
    suggestion: Suggestion;
    setCurrentPage: (page: number) => void;
    setCurrentSuggestion: (suggestion: Suggestion) => void;
}

export default function singleSuggestion(props: singleSuggestionProps) {

    const router = useRouter();

    return (
        <div className="suggestion-root" onMouseDown={() => { props.setCurrentPage(3); props.setCurrentSuggestion(props.suggestion)}}>
            <Image src={location} alt="location icon" className="suggestion-image"></Image>
            <div>{props.suggestion.display_name}</div>
        </div>
    );
}