import { Input } from "@heroui/input";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalContent,
} from "@heroui/modal";
import { Controller } from "react-hook-form";
import useAddTypeModal from "./useAddTypeModal";
import { Button } from "@heroui/button";
import InputFile from "@/components/ui/InputFIle";
import { Spinner } from "@heroui/spinner";
import { useEffect } from "react";

interface PropTypes {
	isOpen: boolean;
	onClose: () => void;
	onOpenChange: () => void;
	refetchType: () => void;
}

const AddTypeModal = (props: PropTypes) => {
	const { isOpen, onClose, onOpenChange, refetchType } = props;

	const {
		control,
		handleSubmitForm,
		reset,
		getValues,
		watch,
		errors,
		preview,

		isPendingAddType,
		isPendingUploadFile,
		isPendingDeleteFile,
		handleAddType,
		handleUploadIcon,
		handleDeleteIcon,
		handleOnClose,
		isSuccessAddType
	} = useAddTypeModal();
	const disabledSubmit =
		isPendingDeleteFile || isPendingUploadFile || isPendingAddType;

	useEffect(() => {
		if(isSuccessAddType){
			onClose()
			refetchType()
		}
	}, [isSuccessAddType])

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} className="p-3">
			<form onSubmit={handleSubmitForm(handleAddType)}>
				<ModalContent>
					<ModalHeader>
						<p>Add Room Type here</p>
					</ModalHeader>
					<ModalBody>
						<p>information</p>
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
						<p>Icon</p>
						<Controller
							name="icon"
							control={control}
							render={({ field: { onChange, value, ...field } }) => (
								<InputFile
									{...field}
									onUpload={(files) => handleUploadIcon(files, onChange)}
									onDelete={() => handleDeleteIcon(onChange)}
									isUploading={isPendingUploadFile}
									isDeleting={isPendingDeleteFile}
									isInvalid={errors.icon !== undefined}
									errorMessage={errors.icon?.message}
									isDropable
									preview={typeof preview === "string" ? preview : ""}
								/>
							)}
						/>
					</ModalBody>
					<ModalFooter>
						<div className="flex gap-2">
							<Button
								onPress={() => handleOnClose(onClose)}
								disabled={disabledSubmit}
								className="text-white text-md bg-default-700"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={disabledSubmit}
								className="text-white text-md bg-default-700"
							>
								{isPendingAddType ? (
									<Spinner size="sm" color="white" />
								) : (
									"Create Type"
								)}
							</Button>
						</div>
					</ModalFooter>
				</ModalContent>
			</form>
		</Modal>
	);
};

export default AddTypeModal;
