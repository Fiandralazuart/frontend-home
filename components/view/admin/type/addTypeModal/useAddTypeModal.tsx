import useMediaHandling from "@/components/hooks/useMediaHandling";
import { ToasterContext } from "@/context/ToasterContex";
import typeServices from "@/services/type.service";
import { IRoomType } from "@/types/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const Schema = yup.object().shape({
	name: yup.string().required("Please input name for this room type"),
	icon: yup
		.mixed<FileList | string>()
		.required("Please insert icon for this type"),
});

const useAddTypeModal = () => {
	const { setToaster } = useContext(ToasterContext);

	const {
		isPendingUploadFile,
		handleUploadFile,
		isPendingDeleteFile,
		handleDeleteFile,
	} = useMediaHandling();

	const {
		control,
		handleSubmit: handleSubmitForm,
		reset,
		getValues,
		watch,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: yupResolver(Schema),
	});

	const preview = watch("icon");
	const fileUrl = getValues("icon");

	const handleUploadIcon = (
		files: FileList,
		onChange: (files: FileList | undefined) => void
	) => {
		handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
			if (fileUrl) {
				setValue("icon", fileUrl);
			}
		});
	};

	const handleDeleteIcon = (
		onChange: (files: FileList | undefined) => void
	) => {
		handleDeleteFile(fileUrl, () => onChange(undefined))
	};

	const handleOnClose = (onClose: () => void) => {
      handleDeleteFile(fileUrl, () => {
         reset();
			onClose();
      })
	};

	const addType = async (payload: IRoomType) => {
		const result = await typeServices.create(payload)
		return result
	}

	const {mutate: mutateAddType, isPending: isPendingAddType, isSuccess: isSuccessAddType} = useMutation({
		mutationFn: addType,
		onError: (error) => {
			setToaster({
				type: "error",
				message: error.message
			})
		},
		onSuccess: () => {
			setToaster({
				type: "success",
				message: "Success to create type"
			})
			reset()
		} 
	})
	const handleAddType = (data: IRoomType) => mutateAddType(data)

	return {
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
	};
};

export default useAddTypeModal;
