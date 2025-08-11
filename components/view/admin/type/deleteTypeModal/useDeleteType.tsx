import { ToasterContext } from "@/context/ToasterContex";
import typeServices from "@/services/type.service";
import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";

const useDeleteType = () => {
	const { setToaster } = useContext(ToasterContext);

	const deleteType = async (id: string) => {
		const result = await typeServices.delete(id);
		return result;
	};
	const {
		mutate: mutateDeleteType,
		isPending: isPendingDeleteType,
		isSuccess: isSuccessDeleteType,
	} = useMutation({
		mutationFn: deleteType,
		onError: (error) => {
			setToaster({
				type: "error",
				message: error.message,
			});
		},
		onSuccess: () => {
			setToaster({
				type: "success",
				message: "Success to delete room type",
			});
		},
	});

	return {
		mutateDeleteType,
		isPendingDeleteType,
		isSuccessDeleteType
	};
};

export default useDeleteType;
