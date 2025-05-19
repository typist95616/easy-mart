import "./dropdownItem.css";
import Image from "next/image";
import orange from "../images/orange.png"
import { Product } from "../types/Product";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DropdownItemProp {
    index: number;
    product: Product;
}

export default function DropdownItem({ index, product }: DropdownItemProp) {

    const bgColorClass = index % 2 === 0 ? "dropdown-bg-grey" : "dropdown-bg-white";
    const router = useRouter();

    return (
        <div
            className={`dropDown-component ${bgColorClass}`}
            onMouseDown={() => {
                router.push(`/pages/product?ID=${product.id}`);
            }}
        >
            <Image src={product.img_url} alt="search image" className="dropdown-searchImage" width={40} height={40} />
            <div className="dropdown-searchText">{product.name}</div>
        </div>
    );
}