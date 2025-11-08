import endpoint from "./endpoint";

import instance from "@/libs/axios/instance";
import { IActivation, ILogin, IPassword, IProfile, IRegister } from "@/types/auth";

const authServices = {
	register: (payload: IRegister) => instance.post(`${endpoint.AUTH}/register`, payload),
	updateProfile: (payload: IProfile) => instance.post(`${endpoint.AUTH}/update-profile`, payload),
	updatePassword: (payload: IPassword) => instance.post(`${endpoint.AUTH}/update-password`, payload),
	login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),
	getProfileWithToken: (token: string) => instance.get(`${endpoint.AUTH}/me`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}),
	activation: (payload: IActivation) => instance.post(`${endpoint.AUTH}/activation`, payload),
	getProfile: () => instance.get(`${endpoint.AUTH}/me`),
}

export default authServices