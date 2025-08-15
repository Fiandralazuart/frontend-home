import instance from "@/libs/axios/instance";
import endpoint from "./endpoint";

const accomodationService = {
	findAll: (params?: string) => instance.get(`${endpoint.ACCOMODATION}?${params}`)
}

export default accomodationService