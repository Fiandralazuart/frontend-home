import useMediaHandling from "@/components/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup"


const schemaUpdateIcon = yup.object().shape({
	icon: yup
		.mixed<FileList | string>()
		.required('Please input icon of category'),
});

const useCoverTab = () => {
	const { 
		control,
		handleSubmit,
		getValues,
		watch,
		setValue,
		reset,
		formState: { errors: errosUpdateIcon}
	} = useForm({
		resolver: yupResolver(schemaUpdateIcon)
	})

	const { 
		isPendingDeleteFile,
		isPendingUploadFile,
		handleDeleteFile,
		handleUploadFile
	} = useMediaHandling()

	const preview = watch("icon")
	const fileUrl = getValues("icon")

	const handleUploadIcon = (
		files: FileList,
		onChange: (files: FileList | undefined) => void 
	) => {
		handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
			if(fileUrl) {
				setValue("icon", fileUrl)
			}
		})
	}

	const handleDeleteIcon = (
		onChange: (files: FileList | undefined) => void
	) => {
		handleDeleteFile(fileUrl, () => onChange(undefined))
	}

	return {
		control,
		handleSubmit,
		getValues,
		watch,
		setValue,
		reset,
		errosUpdateIcon,

		handleDeleteIcon,
		handleUploadIcon,
		isPendingDeleteFile,
		isPendingUploadFile,
		preview
	};
};

export default useCoverTab;
