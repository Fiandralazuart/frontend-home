import { ToasterContext } from "@/context/ToasterContex";
import reservationServices from "@/services/reservation.service";
import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";

const useDeleteReservationModal = () => {
	const { setToaster } = useContext(ToasterContext);

	const deleteReservation = async (id: string) => {
		const result = await reservationServices.delete(id);
		return result;
	};

	const {
		mutate: mutateDeleteReservation,
		isPending: isPendingDeleteReservation,
		isSuccess: isSuccessDeleteReservation,
	} = useMutation({
		mutationFn: deleteReservation,
		onError: (error) => {
			setToaster({
				type: "error",
				message: error.message,
			});
		},
		onSuccess: () => {
			setToaster({
				type: "success",
				message: "Success to delete reservation",
			});
		},
	});

	const handleDeleteReservation = (id: string) => mutateDeleteReservation(id) 

	return {
		handleDeleteReservation,
		isPendingDeleteReservation,
		isSuccessDeleteReservation
	};
};

export default useDeleteReservationModal;
