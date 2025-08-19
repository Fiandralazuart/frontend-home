import useDebounce from "@/components/hooks/useDebounce";
import useMediaHandling from "@/components/hooks/useMediaHandling";
import { DELAY } from "@/constant/list.constant";
import { ToasterContext } from "@/context/ToasterContex";
import accomodationService from "@/services/accomodation.service";
import typeServices from "@/services/type.service";
import { IAccomodation, IAccomodationForm } from "@/types/accomodation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const Schema = yup.object().shape({
	name: yup.string().required("Please input name of accomodation"),
	type: yup.string().required("Please select type of accomodation"),
	image: yup.string().required("Please insert image of accomodation"),
	price: yup.string().required("Please input price of accomodation"),
	facilities: yup
		.array()
		.of(yup.string().required())
		.min(1, "Please select at least one facility"),
	description: yup
		.string()
		.required("Please input description of accomodation"),
	isPublish: yup.string().required("Please select status of accomodation"),
	address: yup.string().required("Please input address of accomodation"),
	region: yup.string().required("Please select region of accomodation"),
	link: yup.string().required("Please input link maps of accomodation"),
});

const useAddAccomodationModal = () => {
	const { isReady } = useRouter();
	const { setToaster } = useContext(ToasterContext);
	const debounce = useDebounce();

	const {
		handleUploadFile,
		handleDeleteFile,
		isPendingDeleteFile,
		isPendingUploadFile,
	} = useMediaHandling();

	const {
		control,
		formState: { errors },
		watch,
		getValues,
		setValue,
		handleSubmit,
		reset,
	} = useForm({
		resolver: yupResolver(Schema),
	});

	const preview = watch("image");
	const fileUrl = getValues("image");

	const handleUploadImage = (
		files: FileList,
		onChange: (files: FileList | undefined) => void
	) => {
		handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
			if (fileUrl) {
				setValue("image", fileUrl);
			}
		});
	};

	const handleDeleteImage = (
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

	const addAccomodation = async (payload: IAccomodation) => {
		const result = await accomodationService.create(payload);
		return result;
	};

	const {
		mutate: mutateAddAccomodation,
		isPending: isPendingAddAccomodation,
		isSuccess: isSuccessAddAccomodation,
	} = useMutation({
		mutationFn: addAccomodation,
		onError: (error) => {
			setToaster({
				type: "error",
				message: error.message,
			});
		},
		onSuccess: () => {
			setToaster({
				type: "success",
				message: "Success to create accomodation",
			});
		},
	});
	const handleAddAccomodation = (data: IAccomodationForm) => {
		const payload = {
			...data,
			location: {
				address: `${data?.address}`,
				region: `${data?.region}`,
				link: `${data?.link}`,
				
			},
		};
		mutateAddAccomodation(payload);
	};

	const getType = async () => {
		const result = await typeServices.findAll();
		return result;
	};
	const { data: dataType } = useQuery({
		queryKey: ["Type"],
		queryFn: getType,
		enabled: isReady,
	});

	const [searchRegency, setSearchRegency] = useState("");
	const { data: dataRegion } = useQuery({
		queryKey: ["region", searchRegency],
		queryFn: () => accomodationService.locationByRegency(`${searchRegency}`),
		enabled: searchRegency !== "",
	});

	const handleSearchRegion = (region: string) => {
		debounce(() => setSearchRegency(region), DELAY);
	};

	return {
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
	};
};

export default useAddAccomodationModal;
