import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteAccomodation from "./useDeleteAccomodation";
import { Spinner } from "@heroui/spinner";
import SuccessPage from "@/pages/auth/register/success";

interface PropTypes {
	isOpen: boolean;
	onClose: () => void;
	onOpenChange: () => void;
	refetchAccomodation: () => void;
	selectedId: string;
	setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteAccomodationModal = (props: PropTypes) => {
	const { isOpen, onClose, onOpenChange, refetchAccomodation, selectedId, setSelectedId} = props
	const {
		mutateDeleteAccomodation,
		isPendingDeleteAccomodation,
		isSuccessDeleteAccomodation
	} = useDeleteAccomodation()

	useEffect(() => {
		if(isSuccessDeleteAccomodation){
			onClose()
			refetchAccomodation()
		}
	}, [isSuccessDeleteAccomodation])

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				<ModalHeader>
					<p>Delete Accomodation</p>
				</ModalHeader>
				<ModalBody>
					<p>Are u sure want to delete this room?</p>
				</ModalBody>
				<ModalFooter>
					<Button className="text-white bg-default-700" onPress={onClose}>
						Cancel
					</Button>
					<Button onPress={() => mutateDeleteAccomodation(selectedId)} className="text-white bg-default-700">
						{ isPendingDeleteAccomodation ? (
							<Spinner size="sm" />
						) : (
							"Delete"
						)}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default DeleteAccomodationModal;

// 68a3472830e884e538ba8c7b