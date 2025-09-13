import useMediaHandling from "@/components/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateImage = yup.object().shape({
	banner: yup
		.mixed<FileList | string>()
		.required("Please input Image of category"),
});

const useImageTab = () => {
	const {
		control: controlUpdateImage,
		handleSubmit: handleSubmitUpdateImage,
		formState: { errors: errorsUpdateImage },
		reset: resetUpdateImage,
		getValues: getValuesUpdateImage,
		watch: watchUpdateImage,
		setValue: SetValueUpdateImage,
	} = useForm({
		resolver: yupResolver(schemaUpdateImage),
	});

	const {
		isPendingDeleteFile,
		isPendingUploadFile,
		handleUploadFile,
		handleDeleteFile,
	} = useMediaHandling();

	const preview = watchUpdateImage("banner");
	const fileUrl = getValuesUpdateImage("banner");

	const handleUploadImage = (
		files: FileList,
		onChange: (files: FileList | undefined) => void
	) => {
		handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
			if (fileUrl) {
				SetValueUpdateImage("banner", fileUrl);
			}
		});
	};

	const handleDeleteImage = (
		onChange: (files: FileList | undefined) => void
	) => {
		handleDeleteFile(fileUrl, () => onChange(undefined));
	};

	return {
		handleDeleteImage,
		handleUploadImage,
		isPendingDeleteFile,
		isPendingUploadFile,

		controlUpdateImage,
		handleSubmitUpdateImage,
		errorsUpdateImage,
		resetUpdateImage,

		preview,
	};
};

export default useImageTab;
