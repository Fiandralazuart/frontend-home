import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter } from "@heroui/modal";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteType from "./useDeleteType";
import { Spinner } from "@heroui/spinner";

interface PropTypes {
	isOpen: boolean;
	onClose: () => void;
	onOpenChange: () => void;
	refetchType: () => void;
	selectedId: string;
	setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteTypeModal = (props: PropTypes) => {
	const {
		isOpen,
		onClose,
		onOpenChange,
		refetchType,
		selectedId,
		setSelectedId,
	} = props;

	const {
		mutateDeleteType,
		isPendingDeleteType,
		isSuccessDeleteType
	} = useDeleteType()

	useEffect(() => {
		if(isSuccessDeleteType){
			onClose()
			refetchType()
			setSelectedId("")
		}
	}, [isSuccessDeleteType])

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				<ModalHeader>
					<p>Delete Type</p>
				</ModalHeader>
				<ModalBody>
					<p>Are you sure want to delete this type of room?</p>
				</ModalBody>
				<ModalFooter>
					<Button onPress={() => {
						onClose()
						setSelectedId('')
					}} className="text-white bg-default-700">
						Cancel
					</Button>
					<Button onPress={() => mutateDeleteType(selectedId)} className="text-white bg-default-700">
						{isPendingDeleteType ? (
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

export default DeleteTypeModal;
