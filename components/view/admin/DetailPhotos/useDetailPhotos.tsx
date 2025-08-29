import { ToasterContext } from "@/context/ToasterContex";
import accomodationService from "@/services/accomodation.service";
import { IPhotos } from "@/types/accomodation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { watch } from "fs";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const Schema = yup.object().shape({
	name: yup.string().required("please input name of photos"),
	image: yup.string().required("please insert the photos"),
	isPublish: yup.string().required("please select status"),
});

const useDetailPhotos = () => {
	const { setToaster } = useContext(ToasterContext);
	const { query, isReady } = useRouter()

	const { control, handleSubmit, setValue, getValues, reset } = useForm({
		resolver: yupResolver(Schema),
	});

	const getPhotos = async () => {
		const id = `${query.photoId}`
		const { data } = await accomodationService.findPhotosById(id);
		return data.data;
	};

	const { data: dataPhotos, refetch: refetchPhotos } = useQuery({
		queryKey: ["photos"],
		queryFn: getPhotos,
		enabled: isReady
	});

	const updatePhotos = async (payload: IPhotos) => {
		const result = await accomodationService.updatePhotos(`${query.photoId}`, payload);
		return result;
	};

	const {
		mutate: mutateUpdatePhotos,
		isPending: isPendingUpdatePhotos,
		isSuccess: isSuccessUpdatePhotos,
		
	} = useMutation({
		mutationFn: updatePhotos,
		onError: (error) => {
			setToaster({
				type: "error",
				message: error.message,
			});
		},
		onSuccess: () => {
			refetchPhotos()
			setToaster({
				type: "success",
				message: "Success to update photos",
			});
		},
	});

	const handleUpdatePhotos = (data: IPhotos) => mutateUpdatePhotos(data);

	return {
		control,
		handleSubmit,
		setValue,
		getValues,
		reset,

		dataPhotos,
		refetchPhotos,

		handleUpdatePhotos,
		isPendingUpdatePhotos,
		isSuccessUpdatePhotos
	};
};

export default useDetailPhotos;
