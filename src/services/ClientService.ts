import { deliveryApi } from "../api";

const LIMIT_PER_PAGE = 10;

export const getAllClients = async (page: number) =>  {
	try {
		const res = await deliveryApi.get(`/clients?page=${page}&limit=${LIMIT_PER_PAGE}`);
		return res.data;
	} catch(e) {
		console.log("Error fetching clients", e);
	};
};
