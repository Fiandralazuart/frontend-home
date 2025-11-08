import { ToasterContext } from "@/context/ToasterContex";
import authServices from "@/services/auth.service";
import { IPassword } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdatePassword = yup.object().shape({
	oldPassword: yup.string().required("Please insert your old password"),
	password: yup.string().required("Please insert your new password"),
	confirmPassword: yup
		.string()
		.required("Please insert your confirm new password"),
});

const useSecurityTab = () => {
	const { setToaster } = useContext(ToasterContext);
	const {
		control: controlUpdatePassword,
		handleSubmit: handleSubmitUpdatePassword,
		formState: { errors: errorsUpdatePassword },
		reset: resetUpdatePassword,
		setValue: SetValuesUpdatePassword,
	} = useForm({
		resolver: yupResolver(schemaUpdatePassword),
	});

	const updatePassword = async (payload: IPassword) => {
		const { data } = await authServices.updatePassword(payload);
		return data;
	};

	const { mutate: mutateUpdatePassword, isPending: isPendingUpdatePassword } =
		useMutation({
			mutationFn: (payload: IPassword) => updatePassword(payload),
			onError: (error) => {
				setToaster({
					type: "error",
					message: error.message,
				});
			},
			onSuccess: () => {
				SetValuesUpdatePassword("oldPassword", "");
				SetValuesUpdatePassword("password", "");
				SetValuesUpdatePassword("confirmPassword", "");
				resetUpdatePassword();
				setToaster({
					type: "success",
					message: "Success update password",
				});
			},
		});
	const handleUpdatePassword = (data: IPassword) =>
		mutateUpdatePassword(data);

	return {
		controlUpdatePassword,
		errorsUpdatePassword,
		handleSubmitUpdatePassword,
		resetUpdatePassword,
		isPendingUpdatePassword,
		handleUpdatePassword
	};
};

export default useSecurityTab;
