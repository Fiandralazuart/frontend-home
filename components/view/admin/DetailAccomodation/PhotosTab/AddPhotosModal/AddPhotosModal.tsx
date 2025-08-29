import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@heroui/modal";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import useAddPhotosModal from "./useAddPhotosModal";
import { Input } from "@heroui/input";
import { error } from "console";
import {
	Autocomplete,
	AutocompleteItem,
	Select,
	SelectItem,
	Spinner,
} from "@heroui/react";
import InputFile from "@/components/ui/InputFIle";
import { Button } from "@heroui/button";

interface PropTypes {
	isOpen: boolean;
	onClose: () => void;
	onOpenChange: () => void;
	refetchPhotos: () => void;
}

const AddPhotosModal = (props: PropTypes) => {
	const { isOpen, onClose, onOpenChange, refetchPhotos } = props;

	const {
		control,
		errors,
		handleSubmit,

		isPendingAddPhotos,
		isSuccessAddPhotos,
		handleAddPhotos,

		handleDeletePhotos,
		handleUploadPhotos,
		handleOnClose,
		isPendingDeleteFile,
		isPendingUploadFile,
		preview,
	} = useAddPhotosModal();

	useEffect(() => {
		if(isSuccessAddPhotos){
			refetchPhotos()
			onClose()
		}
	}, [isSuccessAddPhotos])

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			onClose={() => handleOnClose(onClose)}
			isDismissable={false}
			scrollBehavior="inside"
		>
			<form onSubmit={handleSubmit(handleAddPhotos)}>
				<ModalContent>
					<ModalHeader>
						<p>Add Photos</p>
					</ModalHeader>
					<ModalBody>
						<p className="text-sm">Information</p>

						<Controller
							name="name"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									label="Name"
									variant="bordered"
									isInvalid={errors.name !== undefined}
									errorMessage={errors.name?.message}
								/>
							)}
						/>
						<Controller
							name="isPublish"
							control={control}
							render={({ field }) => (
								<Select
									{...field}
									label="Status"
									variant="bordered"
									isInvalid={errors.isPublish !== undefined}
									errorMessage={errors.isPublish?.message}
									disallowEmptySelection
								>
									<SelectItem key="true">Publish</SelectItem>
									<SelectItem key="false">Draft</SelectItem>
								</Select>
							)}
						/>
						<p className="text-sm">Photos</p>
						<Controller
							name="image"
							control={control}
							render={({ field: { onChange, value, ...field } }) => (
								<InputFile
									{...field}
									onDelete={() => handleDeletePhotos(onChange)}
									onUpload={(files) => handleUploadPhotos(files, onChange)}
									isUploading={isPendingUploadFile}
									isDeleting={isPendingDeleteFile}
									isInvalid={errors.image !== undefined}
									errorMessage={errors.image?.message}
									isDropable
									preview={typeof preview === "string" ? preview : ""}
								/>
							)}
						/>
					</ModalBody>
					<ModalFooter>
						<Button className="text-white bg-default-700" onPress={onClose}>
							Cancel
						</Button>
						<Button className="text-white bg-default-700" type="submit">
							{isPendingAddPhotos ? <Spinner size="sm" /> : "Create"}
						</Button>
					</ModalFooter>
				</ModalContent>
			</form>
		</Modal>
	);
};

export default AddPhotosModal;
