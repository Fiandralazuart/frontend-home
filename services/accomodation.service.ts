import instance from "@/libs/axios/instance";
import endpoint from "./endpoint";
import { IAccomodation, IAccomodationForm } from "@/types/accomodation";

const accomodationService = {
	findAll: (params?: string) => instance.get(`${endpoint.ACCOMODATION}?${params}`),
	create: (payload: IAccomodation) => instance.post(`${endpoint.ACCOMODATION}`, payload),
	locationByRegency: (name: string) => instance.get(`${endpoint.REGION}-search?name=${name}`),
	getById: (id: string) => instance.get(`${endpoint.ACCOMODATION}/${id}`),
	update: (id: string, payload: IAccomodation) => instance.put(`${endpoint.ACCOMODATION}/${id}`, payload),
	delete: (id: string) => instance.delete(`${endpoint.ACCOMODATION}/${id}`),
	getRegencyById: (id: string) => instance.get(`${endpoint.REGION}/${id}/regency`),
}

export default accomodationService