import { useAddress } from "@/app/Context/AddressQuery";
import "./SettingAddressPage.scss";
import EmptyPage from "@/app/components/addressPageComponent/EmptyPage";
import { useEffect } from "react";


export default function SettingAddressPage() {

    const { addressList } = useAddress();

    useEffect(() => {
        console.log("Address List: ", addressList);
    }, [])

    return (
        <div>
            {addressList === null && (
                <EmptyPage></EmptyPage>
            )}
        </div>
    )
}