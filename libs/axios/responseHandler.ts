import { AxiosError } from "axios"
import { signOut } from 'next-auth/react';
interface ErrorResponseData {
	meta: {
		status: number;
		message: string;
	};
	data: any;
}

export const onErrorHandler = (error: unknown) => {
	const { response } = error as AxiosError;
	const res = response?.data as ErrorResponseData;

	const isOnHome =
		typeof window !== 'undefined' && window.location.pathname === '/';

	if (response && res?.meta?.status === 403 && !isOnHome) {
		setTimeout(() => {
			signOut({ callbackUrl: '/' });
		}, 0);
		
		// signOut({ callbackUrl: '/auth/login' });
	}
} 