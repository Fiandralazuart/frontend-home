import typeServices from "@/services/type.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const Schema = yup.object().shape({
	name: yup.string().required("Please input name of accomodation"),
	type: yup.string().required("Please select type of accomodation"),
	price: yup.string().required("Please imput price of accomodation"),
	facilities: yup
		.array()
		.of(yup.string().required())
		.min(1, "Please select at least 1 facilities")
		.required("Please select facilities of accomodation"),
	isPublish: yup.string().required("Please select status of accomodation"),
	description: yup
		.string()
		.required("Please input description of accomodation"),
});

const useInfoTab = () => {
	const {
		control,
		formState: { errors },
		handleSubmit,
		setValue,
		reset,
	} = useForm({
		resolver: yupResolver(Schema)
	});

	const { data: dataType } = useQuery({
		queryKey: ["Type"],
		queryFn: () => typeServices.findAll(),
	});

	return {
		control,
		errors,
		handleSubmit,
		setValue,
		reset,
		dataType,
	};
};

export default useInfoTab;
