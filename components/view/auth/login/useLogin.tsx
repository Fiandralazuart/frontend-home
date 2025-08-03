import { ToasterContext } from "@/context/ToasterContex";
import { ILogin } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const loginSchema = yup.object().shape({
	identifier: yup.string().required("Please input your username or email"),
	password: yup
		.string()
		.required("Please input your password")
		.min(8, "Password must be at least 8 characters"),
});

const useLogin = () => {
	const { setToaster } = useContext(ToasterContext);
	const router = useRouter();

	const callbackUrl = "/";

	const [visible, setVisible] = useState(false);
	const toogleVisible = () => setVisible(!visible);

	
	const loginService = async (payload: ILogin) => {
		console.log("🔍 payload untuk signIn", payload);
		
		const result = await signIn("credentials", {
			...payload,
			redirect: false,
			callbackUrl,
		});

		console.log("isi data", result);

		if (result?.error && result?.status === 401) {
			// throw new Error("Invalid Password for Your Email or Username")
			throw new Error("Invalid Password for Your Email or Username")
			return {
				success: false,
				message: "Invalid Password for Your Email or Username",
			};
		}
	};

	const {
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(loginSchema),
	});

	const { mutate: mutateLogin, isPending: isPendingMutateLogin } = useMutation({
		mutationFn: loginService,
		onError: () => {
			setToaster({
				type: "error",
				message: "Failed to login",
			});
		},
		onSuccess: () => {
			setToaster({
				type: "success",
				message: "Success to login",
			});
			router.push(callbackUrl);
			reset();
		},
	});

	const handleLogin = (data: ILogin) => mutateLogin(data);

	return {
		control,
		handleSubmit,
		errors,
		isPendingMutateLogin,
		handleLogin,
		visible,
		toogleVisible,
	};
};

export default useLogin;
