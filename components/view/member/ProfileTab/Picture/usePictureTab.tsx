
import useMediaHandling from "@/components/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdatePicture = yup.object().shape({
	profilePicture: yup
		.mixed<FileList | string>()
		.required("Please input Picture of event"),
});

const usePictureTab = () => {
	const {
		control: controlUpdatePicture,
		handleSubmit: handleSubmitUpdatePicture,
		formState: { errors: errorsUpdatePicture },
		reset: resetUpdatePicture,
		getValues: getValuesUpdatePicture,
		watch: watchUpdatePicture,
		setValue: SetValueUpdatePicture,
	} = useForm({
		resolver: yupResolver(schemaUpdatePicture),
	});

	const {
		isPendingUploadFile,
		isPendingDeleteFile,
		handleDeleteFile,
		handleUploadFile,
	} = useMediaHandling();

	const preview = watchUpdatePicture("profilePicture");
	const fileUrl = getValuesUpdatePicture("profilePicture");

	const handleUploadPicture = (
		files: FileList,
		onChange: (files: FileList | undefined) => void
	) => {
		handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
			if (fileUrl) {
				SetValueUpdatePicture("profilePicture", fileUrl);
			}
		});
	};

	const handleDeletePicture = (
		onChange: (files: FileList | undefined) => void
	) => {
		handleDeleteFile(fileUrl, () => onChange(undefined));
	};

	return {
		handleDeletePicture,
		handleUploadPicture,
		isPendingDeleteFile,
		isPendingUploadFile,

		controlUpdatePicture,
		handleSubmitUpdatePicture,
		errorsUpdatePicture,
		resetUpdatePicture,

		preview,
	};
};

export default usePictureTab;
