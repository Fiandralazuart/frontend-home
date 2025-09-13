import React, { useEffect } from "react";
import useAddBannerModal from "./useAddBannerModal";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Controller } from "react-hook-form";
import { Input, Select, SelectItem, Spinner } from "@heroui/react";
import InputFile from "@/components/ui/InputFIle";
import { Button } from "@heroui/button";


interface PropTypes {
	isOpen: boolean;
	onClose: () => void;
	refetchBanner: () => void;
	onOpenChange: () => void;
}

const AddBannerModal = (props: PropTypes) => {
	const { isOpen, onClose, onOpenChange, refetchBanner } = props;

	const {
		control,
		errors,
		reset,
		handleSubmitForm,
		handleAddBanner,
		isPendingMutateAddBanner,
		isSuccessMutateBanner,

		handleUploadBanner,
		isPendingUploadFile,
		handleDeleteBanner,
		isPendingDeleteFile,
		handleOnClose,
		preview,
	} = useAddBannerModal()

	useEffect(() => {
		if (isSuccessMutateBanner) {
			onClose();
			refetchBanner();
		}
	}, [isSuccessMutateBanner]);

	const disabledSubmit =
		isPendingMutateAddBanner ||
		isPendingUploadFile ||
		isPendingDeleteFile;

	return (
		<Modal
			onOpenChange={onOpenChange}
			isOpen={isOpen}
			placement="center"
			scrollBehavior="inside"
			isDismissable={false}
			onClose={() => handleOnClose(onClose)}
		>
			<form onSubmit={handleSubmitForm(handleAddBanner)}>
				<ModalContent className="m-4">
					<ModalHeader>Add Banner</ModalHeader>
					<ModalBody>
						<div className="flex flex-col gap-2">
							<p className="text-sm font-bold">Information</p>
							<Controller
								name="title"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										label="Title"
										variant="bordered"
										type="text"
										isInvalid={errors.title !== undefined}
										errorMessage={errors.title?.message}
										className="mb-2"
									/>
								)}
							/>

								<Controller
									name="isShow"
									control={control}
									render={({ field }) => (
										<Select
											{...field}
											label="Status"
											variant="bordered"
											isInvalid={errors.isShow !== undefined}
											errorMessage={errors.isShow?.message}
											disallowEmptySelection
										>
											<SelectItem key="true">
												Show
											</SelectItem>
											<SelectItem key="false">
												Hide
											</SelectItem>
										</Select>
									)}
								/>

							<p className="text-sm font-bold">Banner</p>
							<Controller
								name="banner"
								control={control}
								render={({ field: { onChange, value, ...field } }) => (
									<InputFile
										{...field}
										onDelete={() => handleDeleteBanner(onChange)}
										onUpload={(files) => handleUploadBanner(files, onChange)}
										isUploading={isPendingUploadFile}
										isDeleting={isPendingDeleteFile}
										isInvalid={errors.banner !== undefined}
										errorMessage={errors.banner?.message}
										isDropable
										preview={typeof preview === 'string' ? preview : ''}
									/>
								)}
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button
							className="text-white bg-default-700"
							variant="flat"
							onPress={() => handleOnClose(onClose)}
							disabled={disabledSubmit}
						>
							Cancel
						</Button>
						<Button className="text-white bg-default-700" type="submit" disabled={disabledSubmit}>
							{isPendingMutateAddBanner ? (
								<Spinner size="sm" color="white" />
							) : (
								'Create Banner'
							)}
						</Button>
					</ModalFooter>
				</ModalContent>
			</form>
		</Modal>
	);
};

export default AddBannerModal;
