import useMediaHandling from "@/components/hooks/useMediaHandling";
import { ToasterContext } from "@/context/ToasterContex";
import accomodationService from "@/services/accomodation.service";
import { IPhotos } from "@/types/accomodation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const Schema = yup.object().shape({
	name: yup.string().required("please input name of this photos"),
	isPublish: yup.string().required("please select status of this photos"),
	image: yup.string().required("Please insert photos")
});
const useAddPhotosModal = () => {
	const { setToaster } = useContext(ToasterContext);
	const { query } = useRouter()

	const {
		handleUploadFile,
		handleDeleteFile,
		isPendingDeleteFile,
		isPendingUploadFile,
	} = useMediaHandling();

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		getValues,
		reset,
		setValue
	} = useForm({
		resolver: yupResolver(Schema),
	});

	const createPhotos = async (payload: IPhotos) => {
		const result = await accomodationService.createPhotos(payload);
		return result;
	};

	const {
		mutate: mutateAddPhotos,
		isPending: isPendingAddPhotos,
		isSuccess: isSuccessAddPhotos,
	} = useMutation({
		mutationFn: createPhotos,
		onError: (error) => {
			setToaster({
				type: "error",
				message: error.message,
			});
		},
		onSuccess: () => {
			setToaster({
				type: "success",
				message: "Success to create photos",
			});
			reset()
		},
	});

	const handleAddPhotos = (data: IPhotos) => {
		const payload = {
			...data,
			accomodation: `${query.id}`
		}

		mutateAddPhotos(payload)
	} 

	const preview = watch("image");
	const fileUrl = getValues("image");

	const handleUploadPhotos = (
		files: FileList,
		onChange: (files: FileList | undefined) => void
	) => {
		handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
			if (fileUrl) {
				setValue("image", fileUrl);
			}
		});
	};

	const handleDeletePhotos = (
		onChange: (files: FileList | undefined) => void
	) => {
		handleDeleteFile(fileUrl, () => onChange(undefined));
	};

	const handleOnClose = (onClose: () => void) => {
		handleDeleteFile(fileUrl, () => {
			reset();
			onClose();
		});
	};
	return {
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
		preview
	};
};

export default useAddPhotosModal;
