import { ToasterContext } from "@/context/ToasterContex";
import accomodationService from "@/services/accomodation.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteAccomodation = () => {
	const { setToaster } = useContext(ToasterContext);

	const deleteAccomodation = async (id: string) => {
		const result = await accomodationService.delete(id);
		return result;
	};

	const {
		mutate: mutateDeleteAccomodation,
		isPending: isPendingDeleteAccomodation,
		isSuccess: isSuccessDeleteAccomodation,
	} = useMutation({
		mutationFn: deleteAccomodation,
		onError: (error) => {
			setToaster({
				type: "error",
				message: error.message,
			});
		},
		onSuccess: () => {
			setToaster({
				type: "success",
				message: "Success to delete room",
			});
		},
	});

	return {
		mutateDeleteAccomodation,
		isPendingDeleteAccomodation,
		isSuccessDeleteAccomodation
	};
};

export default useDeleteAccomodation;
