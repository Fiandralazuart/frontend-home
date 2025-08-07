import instance from "@/libs/axios/instance";
import endpoint from "./endpoint";
import { IRoomType } from "@/types/type";


const typeServices = {
	create: (payload: IRoomType) => instance.post(`${endpoint.TYPE}`, payload),
	findAll: (params?: string) => instance.get(`${endpoint.TYPE}/?${params}`)
}

export default typeServices