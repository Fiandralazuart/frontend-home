import React, { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteAccomodation from "../../accomodation/deleteAccomodationModal/useDeleteAccomodation";
import useDeleteReservationModal from "./useDeleteReservationModal";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import reservationServices from "@/services/reservation.service";

interface PropTypes {
	isOpen: boolean;
	onClose: () => void;
	onOpenChange: () => void;
	refetchReservation: () => void;
	selectedId: string;
	setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteReservationModal = (props: PropTypes) => {
	const { isOpen, onClose, onOpenChange, refetchReservation, selectedId, setSelectedId } = props
	const {
		handleDeleteReservation,
		isPendingDeleteReservation,
		isSuccessDeleteReservation,
	} = useDeleteReservationModal()

	useEffect(() => {
		if(isSuccessDeleteReservation){
			setSelectedId("")
			onClose()
			refetchReservation() 
		}
	}, [isSuccessDeleteReservation])

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				<ModalHeader>
					<p>Delete Reservation</p>
				</ModalHeader>
				<ModalBody>
					<p>Are you sure want to delete this reservation?</p>
				</ModalBody>
				<ModalFooter>
					<Button onPress={onClose} className="text-white bg-default-700">
						Cancel
					</Button>
					<Button onPress={() => handleDeleteReservation(selectedId)} className="text-white bg-default-700">
						{isPendingDeleteReservation ? (
							<Spinner size="sm" />
						) : (
							"Delete"
						)}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
};

export default DeleteReservationModal;
