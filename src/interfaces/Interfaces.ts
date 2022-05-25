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
};

export interface IClientWithInvoices {
	id:         string;
    createdAt:  Date;
    updatedAt:  Date;
    name:       string;
    nationalId: number;
    lastName:   string;
    zipCode:    number;
    address:    string;
    invoices:   IInvoice[];
};

export interface ITrack {
    id:        string;
    createdAt: Date;
    updatedAt: Date;
    origin:    string;
    destiny:   string;
    cost:      number;
};

export interface INewTrack {
    origin:  string;
    destiny: string;
    cost:    number;
};

export interface IInvoice {
    id:        string;
    createdAt: Date;
    updatedAt: Date;
    date:      string;
    total:     number;
};

export interface INewInvoice {
    date:     Date;
    items:    IItem[];
    clientId: string;
}

export interface IItem {
    name:    string;
    price:   number;
    trackId: string;
}


export interface IInvoiceWithClientsAndPackages {
    id:        string;
    createdAt: Date;
    updatedAt: Date;
    date:      Date;
    total:     number;
    packages:  IPackage[];
    client:    IClient;
}

export interface IPackage {
    id:        string;
    createdAt: Date;
    updatedAt: Date;
    name:      string;
    price:     number;
}
