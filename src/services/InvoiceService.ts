import { deliveryApi } from "../api";
import { INewInvoice } from "../interfaces/Interfaces";

export const LIMIT_PER_PAGE = 10;

export const getAllInvoices = async (page: number) =>  {
	try {
		const res = await deliveryApi.get(`/invoices?page=${page}&limit=${LIMIT_PER_PAGE}`);
		if(res.data.ok) {
			return res.data;
		};
	} catch(e) {
		console.log("Error fetching invoices", e);
	};
};

export const deleteInvoice = async (invoiceId: string) =>  {
	try {
		const res = await deliveryApi.delete(`/invoices/${invoiceId}`);
		return res.data;
	} catch(e) {
		console.log("Error deleting invoice", e);
		return false;
	};
};

export const createNewInvoice = async (invoice: INewInvoice) =>  {
	try {
		const res = await deliveryApi.post("/invoices", invoice);
		return res.data;
	} catch(e) {
		console.log("Error creating invoice", e);
		return false;
	};
};
