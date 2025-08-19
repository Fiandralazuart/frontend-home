import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalContent,
} from "@heroui/modal";
import useAddAccomodationModal from "./useAddAccomodationModal";
import { Controller } from "react-hook-form";
import { Input } from "@heroui/input";
import { Select, SelectItem, Spinner, Textarea } from "@heroui/react";
import {
	Autocomplete,
	AutocompleteSection,
	AutocompleteItem,
} from "@heroui/react";
import { IRoomType } from "@/types/type";
import { IRegency } from "@/types/accomodation";
import InputFile from "@/components/ui/InputFIle";
import { useEffect } from "react";
import { Button } from "@heroui/button";
import { FACILITIES_LIST } from "./addAccomodation.constant";

interface PropTypes {
	isOpen: boolean;
	onClose: () => void;
	onOpenChange: () => void;
	refetchAccomodation: () => void;
}

const AddAccomodationModal = (props: PropTypes) => {
	const { isOpen, onClose, onOpenChange, refetchAccomodation } = props;
	const {
		handleUploadImage,
		handleDeleteImage,
		isPendingDeleteFile,
		isPendingUploadFile,
		preview,
		handleOnClose,

		control,
		errors,
		watch,
		getValues,
		setValue,
		handleSubmit,
		reset,

		handleAddAccomodation,
		isPendingAddAccomodation,
		isSuccessAddAccomodation,

		dataType,
		dataRegion,
		searchRegency,
		handleSearchRegion,
	} = useAddAccomodationModal();

	useEffect(() => {
		if (isSuccessAddAccomodation) {
			refetchAccomodation();
			onClose();
		}
	}, [isSuccessAddAccomodation]);

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			className="p-4"
			isDismissable={false}
			scrollBehavior="inside"
			onClose={() => handleOnClose(onClose)}
		>
			<form onSubmit={handleSubmit(handleAddAccomodation)}>
				<ModalContent>
					<ModalHeader>
						<h1>Create Accomodation</h1>
					</ModalHeader>
					<ModalBody>
						<div className="flex flex-col gap-2">
							<h1>Information</h1>
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
								name="price"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										label="Price"
										variant="bordered"
										isInvalid={errors.price !== undefined}
										errorMessage={errors.price?.message}
									/>
								)}
							/>
							<Controller
								name="type"
								control={control}
								render={({ field: { onChange, ...field } }) => (
									<Autocomplete
										{...field}
										defaultItems={dataType?.data.data}
										label="Type"
										variant="bordered"
										isInvalid={errors.type !== undefined}
										errorMessage={errors.type?.message}
										onSelectionChange={(value) => onChange(value)}
									>
										{(type: IRoomType) => (
											<AutocompleteItem key={`${type._id}`}>
												{type.name}
											</AutocompleteItem>
										)}
									</Autocomplete>
								)}
							/>
							<Controller
								name="facilities"
								control={control}
								render={({ field }) => (
									<Select
										items={FACILITIES_LIST}
										label="Facilities"
										variant="bordered"
										selectionMode="multiple"
										isInvalid={!!errors.facilities}
										errorMessage={errors.facilities?.message}
										selectedKeys={new Set(field.value ?? [])} // ✅ Set<string>
										onSelectionChange={(keys) => {
											field.onChange(Array.from(keys) as string[]);
										}}
									>
										{FACILITIES_LIST.map((item) => (
											<SelectItem key={item.key}>{item.label}</SelectItem>
										))}
									</Select>
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
							<Controller
								name="description"
								control={control}
								render={({ field }) => (
									<Textarea
										{...field}
										label="Description"
										variant="bordered"
										isInvalid={errors.description !== undefined}
										errorMessage={errors.description?.message}
									/>
								)}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<h1>Location</h1>
							<Controller
								name="address"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										label="Address"
										variant="bordered"
										isInvalid={errors.address !== undefined}
										errorMessage={errors.address?.message}
									/>
								)}
							/>
							<Controller
								name="region"
								control={control}
								render={({ field: { onChange, ...field } }) => (
									<Autocomplete
										{...field}
										defaultItems={
											dataRegion?.data.data && searchRegency !== ""
												? dataRegion?.data.data
												: []
										}
										label="City"
										variant="bordered"
										onInputChange={(search) => handleSearchRegion(search)}
										isInvalid={errors.region !== undefined}
										errorMessage={errors.region?.message}
										onSelectionChange={(value) => onChange(value)}
										placeholder="Search city here "
									>
										{(regency: IRegency) => (
											<AutocompleteItem key={`${regency.id}`}>
												{regency.name}
											</AutocompleteItem>
										)}
									</Autocomplete>
								)}
							/>
							<Controller
								name="link"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										label="Link"
										variant="bordered"
										isInvalid={errors.link !== undefined}
										errorMessage={errors.address?.message}
									/>
								)}
							/>
						</div>
						<div>
							<h1>Image</h1>
							<Controller
								name="image"
								control={control}
								render={({ field: { onChange, value, ...field } }) => (
									<InputFile
										{...field}
										onDelete={() => handleDeleteImage(onChange)}
										onUpload={(files) => handleUploadImage(files, onChange)}
										isUploading={isPendingUploadFile}
										isDeleting={isPendingDeleteFile}
										isInvalid={errors.image !== undefined}
										errorMessage={errors.image?.message}
										isDropable
										preview={typeof preview === "string" ? preview : ""}
									/>
								)}
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button className="text-white bg-default-700" onPress={onClose}>
							cancel
						</Button>
						<Button type="submit" className="text-white bg-default-700">
							{isPendingAddAccomodation ? <Spinner size="md" /> : "Create"}
						</Button>
					</ModalFooter>
				</ModalContent>
			</form>
		</Modal>
	);
};

export default AddAccomodationModal;
