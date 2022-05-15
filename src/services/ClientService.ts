import { deliveryApi } from "../api";
import { INewClient } from "../interfaces/Interfaces";

const LIMIT_PER_PAGE = 10;

export const getAllClients = async (page: number) =>  {
	try {
		const res = await deliveryApi.get(`/clients?page=${page}&limit=${LIMIT_PER_PAGE}`);
		return res.data;
	} catch(e) {
		console.log("Error fetching clients", e);
	};
};

export const createNewClient = async (client: INewClient) =>  {
	try {
		const res = await deliveryApi.post("/clients", client);
		console.log(res);
		return res;
	} catch(e) {
		console.log("Error fetching clients", e);
		return false;
	};
};
