import { deliveryApi } from "../api";
import { INewClient } from "../interfaces/Interfaces";

export const LIMIT_PER_PAGE = 10;

export const getAllClients = async (page: number) =>  {
	try {
		const res = await deliveryApi.get(`/clients?page=${page}&limit=${LIMIT_PER_PAGE}`);
		if(res.data.ok) {
			return res.data;
		};
	} catch(e) {
		console.log("Error fetching clients", e);
	};
};

export const createNewClient = async (client: INewClient) =>  {
	try {
		const res = await deliveryApi.post("/clients", client);
		return res.data;
	} catch(e) {
		console.log("Error creating client", e);
		return false;
	};
};

export const deleteClient = async (clientId: string) =>  {
	try {
		const res = await deliveryApi.delete(`/clients/${clientId}`);
		return res.data;
	} catch(e) {
		console.log("Error creating client", e);
		return false;
	};
};
