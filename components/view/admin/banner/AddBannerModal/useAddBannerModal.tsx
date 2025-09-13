import useMediaHandling from "@/components/hooks/useMediaHandling";
import { ToasterContext } from "@/context/ToasterContex";
import bannerServices from "@/services/banner.service";
import { IBanner } from "@/types/banner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const Schema = yup.object().shape({
	banner: yup.mixed<FileList | string>().required("Please insert the banner"),
	title: yup.string().required("Please input title of banner"),
	isShow: yup.string().required("Please select status of banner"),
});

const useAddBannerModal = () => {
	const { setToaster } = useContext(ToasterContext);
	const {
		isPendingUploadFile,
		isPendingDeleteFile,

		handleDeleteFile,
		handleUploadFile,
	} = useMediaHandling();
	const {
		control,
		handleSubmit: handleSubmitForm,
		formState: { errors },
		reset,
		getValues,
		watch,
		setValue,
	} = useForm({
		resolver: yupResolver(Schema),
	});

	const preview = watch("banner");
	const fileUrl = getValues("banner");

	const handleUploadBanner = (
		files: FileList,
		onChange: (files: FileList | undefined) => void
	) => {
		handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
			if (fileUrl) {
				setValue("banner", fileUrl);
			}
		});
	};

	const handleDeleteBanner = (
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

	const addBanner = async (payload: IBanner) => {
		const res = await bannerServices.create(payload);
		return res;
	};

	const {
		mutate: mutateAddBanner,
		isPending: isPendingMutateAddBanner,
		isSuccess: isSuccessMutateBanner,
	} = useMutation({
		mutationFn: addBanner,
		onError: (error) => {
			setToaster({
				type: "error",
				message: error.message,
			});
		},
		onSuccess: () => {
			setToaster({
				type: "success",
				message: "Success Add Banner ",
			});
			reset();
		},
	});

	const handleAddBanner = (data: IBanner) => mutateAddBanner(data);

	return {
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
	};
};

export default useAddBannerModal;
