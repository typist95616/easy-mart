export type Address = {
    place_id: number;
    display_name: string;
    name: string;
    lat: number;
    lon: number;
    city: string;
    postcode: string;
    country: string;
    state_district: string;
    state: string;
    building: string;
    municipality: string;
    road: string;
    village: string;
    roomNumber?: string;
}