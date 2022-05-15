export interface IClient {
    id:         string;
    createdAt:  Date;
    updatedAt:  Date;
    name:       string;
    nationalId: number;
    lastName:   string;
    zipCode:    number;
    address:    string;
}
