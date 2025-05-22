import "./AddressInputPage.scss"

interface AddressInputPageProps {
    setCurrentPage: (page: number) => void;
}

export default function AddressInputPage(props: AddressInputPageProps) {

    return (
        <div>
            <div onClick={() => props.setCurrentPage(1)}>previous page</div>
            <div onClick={() => props.setCurrentPage(3)}>next page</div>
        </div>
    )    
}