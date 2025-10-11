import instance from "@/libs/axios/instance";
import endpoint from "./endpoint";
import { IReservation } from "@/types/reservation";


const reservationServices = {
	create: (payload: IReservation) => instance.post(`${endpoint.RESERVATION}`, payload),
	findAll: (params?: string) => instance.get(`${endpoint.RESERVATION}/?${params}`),
	update: (id: string, payload: IReservation) => instance.put(`${endpoint.RESERVATION}/${id}`, payload),
	findById: (id: string) => instance.get(`${endpoint.RESERVATION}/${id}`),
	findByMember: () => instance.get(`${endpoint.RESERVATION}-history`),
	delete: (id: string) => instance.delete(`${endpoint.RESERVATION}/${id}`),
	updateTransactionStatus: (id: string, status: string) => instance.put(`${endpoint.RESERVATION}/${id}/${status}`),
}

export default reservationServices