import useMediaHandling from "@/components/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from 'yup'

const schemaUpdateImage = yup.object().shape({
	image: yup
		.mixed<FileList | string>()
		.required('Please input image of category'),
});

const usePhotosTab = () => {
	const { 
		control,
		handleSubmit,
		getValues,
		watch,
		setValue,
		reset,
		formState: { errors: errosUpdateImage}
	} = useForm({
		resolver: yupResolver(schemaUpdateImage)
	})

	const { 
		isPendingDeleteFile,
		isPendingUploadFile,
		handleDeleteFile,
		handleUploadFile
	} = useMediaHandling()

	const preview = watch("image")
	const fileUrl = getValues("image")

	const handleUploadImage = (
		files: FileList,
		onChange: (files: FileList | undefined) => void 
	) => {
		handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
			if(fileUrl) {
				setValue("image", fileUrl)
			}
		})
	}

	const handleDeleteImage = (
		onChange: (files: FileList | undefined) => void
	) => {
		handleDeleteFile(fileUrl, () => onChange(undefined))
	}

	
	return {
		control,
		handleSubmit,
		reset,
		errosUpdateImage,
		setValue,

		handleDeleteImage,
		handleUploadImage,
		isPendingDeleteFile,
		isPendingUploadFile,
		preview
	};
};

export default usePhotosTab;
