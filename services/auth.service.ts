import endpoint from "./endpoint";

import instance from "@/libs/axios/instance";
import { ILogin, IRegister } from "@/types/auth";

const authServices = {
	register: (payload: IRegister) => instance.post(`${endpoint.AUTH}/register`, payload),
	login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),
}

export default authServices