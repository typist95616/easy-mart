interface Address{
    city: string;
    postcode: string;
    country: string;
    state_district: string;
    state: string;
    building: string;
    municipality: string;
    road: string;
    village: string;
}

export type Suggestion = {
    display_name: string;
    address: Address;
    name: string;
    lat: number;
    lon: number;
}