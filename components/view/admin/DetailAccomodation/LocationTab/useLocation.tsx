import useDebounce from "@/components/hooks/useDebounce";
import { DELAY } from "@/constant/list.constant";
import accomodationService from "@/services/accomodation.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const Schema = yup.object().shape({
	address: yup.string().required("Please input address of accomodation"),
	region: yup.string().required("Please select city of accomodation"),
	link: yup.string().required("Please input link of accomodation"),
});

const useLocation = () => {
	const debounce = useDebounce()

	const {
		control,
		formState: { errors },
		reset,
		setValue,
		handleSubmit,
	} = useForm({
		resolver: yupResolver(Schema),
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
		control,
		errors,
		reset,
		setValue,
		handleSubmit,

		searchRegency,
		setSearchRegency,
		dataRegion,
		handleSearchRegion
	};
};

export default useLocation;
