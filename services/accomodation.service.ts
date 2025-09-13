import instance from "@/libs/axios/instance";
import endpoint from "./endpoint";
import { IAccomodation, IPhotos } from "@/types/accomodation";

const accomodationService = {
	findAll: (params?: string) => instance.get(`${endpoint.ACCOMODATION}?${params}`),
	create: (payload: IAccomodation) => instance.post(`${endpoint.ACCOMODATION}`, payload),
	locationByRegency: (name: string) => instance.get(`${endpoint.REGION}-search?name=${name}`),
	getById: (id: string) => instance.get(`${endpoint.ACCOMODATION}/${id}`),
	update: (id: string, payload: IAccomodation) => instance.put(`${endpoint.ACCOMODATION}/${id}`, payload),
	delete: (id: string) => instance.delete(`${endpoint.ACCOMODATION}/${id}`),
	getRegencyById: (id: string) => instance.get(`${endpoint.REGION}/${id}/regency`),
	findAllPhotos: () => instance.get(`${endpoint.PHOTOS}`),
	findAllPhotosByAccomodation: (id: string) => instance.get(`${endpoint.PHOTOS}/${id}/photos`),
	findPhotosById: (id: string) => instance.get(`${endpoint.PHOTOS}/${id}`),
	createPhotos: (payload: IPhotos) => instance.post(`${endpoint.PHOTOS}`, payload),
	updatePhotos: (id: string, payload: IPhotos) => instance.put(`${endpoint.PHOTOS}/${id}`, payload),
	deletePhotos: (id: string) => instance.delete(`${endpoint.PHOTOS}/${id}`)
}

export default accomodationService