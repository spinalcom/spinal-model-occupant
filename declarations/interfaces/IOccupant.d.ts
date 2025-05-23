export interface IOccupant {
    first_name: string;
    last_name: string;
    occupantId: string;
    email: string;
    serviceName: string;
    companyName: string;
    phoneNumber: string;
    [key: string]: string;
}
