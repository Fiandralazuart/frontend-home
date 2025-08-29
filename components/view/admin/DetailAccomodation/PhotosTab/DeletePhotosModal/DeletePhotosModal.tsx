import { Button } from "@heroui/button";
import {
	Modal,
	ModalContent,
	ModalBody,
	ModalHeader,
	ModalFooter,
} from "@heroui/modal";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeletePhotosModal from "./useDeletePhotosModal";
import { Spinner } from "@heroui/spinner";

interface PropTypes {
	isOpen: boolean;
	onClose: () => void;
	onOpenChange: () => void;
	refetchPhotos: () => void;
	selectedId: string;
	setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeletePhotosModal = (props: PropTypes) => {
	const {
		isOpen,
		onClose,
		onOpenChange,
		refetchPhotos,
		selectedId,
		setSelectedId,
	} = props;

	const {
		handleDeletePhotos,
		isPendingDeletePhotos,
		isSuccessDeletePhotos,
	} = useDeletePhotosModal();

	useEffect(() => {
		if (isSuccessDeletePhotos) {
			onClose();
			refetchPhotos();
		}
	}, [isSuccessDeletePhotos]);

	return (
		<Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader>
						<p>Delete Photos</p>
					</ModalHeader>
					<ModalBody>
						<p>Are you sure want to delete this photos of accomodation?</p>
					</ModalBody>
					<ModalFooter>
						<Button className="text-white bg-default-700" onPress={onClose}>
							Cancel
						</Button>
						<Button onPress={() => handleDeletePhotos(selectedId)} className="text-white bg-default-700">
							{isPendingDeletePhotos ? <Spinner size="sm" /> : "Delete"}
						</Button>
					</ModalFooter>
				</ModalContent>
		</Modal>
	);
};

export default DeletePhotosModal;
