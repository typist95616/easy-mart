import { useEffect } from "react";
import "./SuccessfulPage.scss";
import { useRouter } from "next/navigation";

interface SuccessfulPageProps {
    setCurrentPage: (currentPage: number) => void;
}

export default function SuccessfulPage(props: SuccessfulPageProps) {

    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/pages/main'); // Redirect to the main page after 2 seconds
        }, 2000);
        // Clean up the timer on component unmount
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <>
            <div>Register Successful!</div>
            <div>Redirecting to Main page...</div>
        </>
    )
}


