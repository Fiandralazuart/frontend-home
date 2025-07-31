import { ToasterContext } from "@/context/ToasterContex"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";


const RegisterSchema = yup.object().shape({
	fullname: yup.string().required("Please input your fullname"),
	username: yup.string().required("Please input your username"),
	email: yup.string().email("Email format is not valid").required("Please input your email"),
	password: yup.string().required("Please input your password").min(8, "Password must be at least 8 characters"),
	confirmPassword: yup.string().required("Please input your confirm password").oneOf([yup.ref('password'), ""], "Password must be match"),
})

const useRegister = () => {
	const router = useRouter()
	const { setToaster } = useContext(ToasterContext)
	
	const [visible, setVisible] = useState({
		password: false,
		confirmPassword: false
	})

	const handleVisible = (key: "password" | "confirmPassword") => {
		setVisible({
			...visible,
			[key]: !visible[key]
		})
	}

	const {control, handleSubmit, reset, formState: {errors} } = useForm({
		resolver: yupResolver(RegisterSchema)
	})

	const registerService = async (payload: IRegister) => {
		const result = authServices.register(payload)

		return result
	}

	const {mutate: mutateRegister, isPending: isPendingMutateRegister} = useMutation({
		mutationFn: registerService,
		onError: () => {
			setToaster({
				type: "error",
				message: "Failed to register"
			})
		},
		onSuccess: () => {
			setToaster({
				type: "error",
				message: "Failed to register"
			})
			router.push("/auth/register/success")
         reset()
		}
	})

	const handleRegister = (data: IRegister) => mutateRegister(data)
	return {
		control,
		handleSubmit,
		handleRegister,
		isPendingMutateRegister,
		errors,
		visible,
		handleVisible
	}
}

export default useRegister