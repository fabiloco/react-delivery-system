import { deliveryApi } from "../api";
import { INewTrack } from "../interfaces/Interfaces";

export const LIMIT_PER_PAGE = 10;

export const getAllTracks = async (page: number, limit: number = LIMIT_PER_PAGE) =>  {
	try {
		const res = await deliveryApi.get(`/packages/tracks?page=${page}&limit=${limit}`);
		if(res.data.ok) {
			return res.data;
		};
	} catch(e) {
		console.log("Error fetching tracks", e);
	};
};

export const deleteTrack = async (trackId: string) =>  {
	try {
		const res = await deliveryApi.delete(`/packages/tracks/${trackId}`);
		return res.data;
	} catch(e) {
		console.log("Error deleting a track", e);
		return false;
	};
};

export const createNewTrack = async (track: INewTrack) =>  {
	try {
		const res = await deliveryApi.post("/packages/tracks", track);
		return res.data;
	} catch(e) {
		console.log("Error creating track", e);
		return false;
	};
};
