import { AxiosError } from "axios"


export const onErrorHandler = (error: unknown) => {
	console.error("error:", error )
} 