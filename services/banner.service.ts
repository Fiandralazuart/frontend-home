import instance from "@/libs/axios/instance";
import endpoint from "./endpoint";
import { IBanner } from "@/types/banner";


const bannerServices = {
	create: (payload: IBanner) => instance.post(`${endpoint.BANNER}`, payload),
	findAll: (params?: string) => instance.get(`${endpoint.BANNER}/?${params}`),
	update: (id: string, payload: IBanner) => instance.put(`${endpoint.BANNER}/${id}`, payload),
	findById: (id: string) => instance.get(`${endpoint.BANNER}/${id}`),
	delete: (id: string) => instance.delete(`${endpoint.BANNER}/${id}`),
}

export default bannerServices