export interface INewClient {
	name:       string;
	nationalId: number;
	lastName:   string;
	zipCode:    number;
	address:    string;
};

export interface IEditClient {
	name:       string;
	lastName:   string;
	zipCode:    number;
	address:    string;
};

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
