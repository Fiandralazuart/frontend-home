import React, { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteBannerModal from "./useDeleteBannerModal";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";

interface PropTypes {
	isOpen: boolean;
	onClose: () => void;
	onOpenChange: () => void;
	refetchBanner: () => void;
	selectedId: string;
	setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteBannerModal = (props: PropTypes) => {
	const { mutateDeleteBanner, isPendingDeleteBanner, isSuccessDeleteBanner } =
		useDeleteBannerModal();
	const {
		isOpen,
		onClose,
		onOpenChange,
		refetchBanner,
		selectedId,
		setSelectedId,
	} = props;

	useEffect(() => {
			if(isSuccessDeleteBanner){
				setSelectedId("")
				onClose()
				refetchBanner() 
			}
		}, [isSuccessDeleteBanner])

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				<ModalHeader>
					<p>Delete Banner</p>
				</ModalHeader>
				<ModalBody>
					<p>Are you sure want to delete this banner?</p>
				</ModalBody>
				<ModalFooter>
					<Button onPress={onClose} className="text-white bg-default-700">
						Cancel
					</Button>
					<Button onPress={() => mutateDeleteBanner(selectedId)} className="text-white bg-default-700">
						{isPendingDeleteBanner ? (
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

export default DeleteBannerModal;
