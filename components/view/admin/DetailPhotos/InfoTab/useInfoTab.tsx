import accomodationService from "@/services/accomodation.service";
import typeServices from "@/services/type.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const Schema = yup.object().shape({
	name: yup.string().required("Please input name of accomodation"),
	isPublish: yup.string().required("Please select status of accomodation"),
});

const useInfoTab = () => {
	const { query } = useRouter()
	const {
		control,
		formState: { errors },
		handleSubmit,
		setValue,
		reset,
	} = useForm({
		resolver: yupResolver(Schema)
	});

	return {
		control,
		errors,
		handleSubmit,
		setValue,
		reset,
	};
};

export default useInfoTab;
