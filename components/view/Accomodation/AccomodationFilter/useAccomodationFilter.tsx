import typeServices from "@/services/type.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup"

const Schema = yup.object().shape({
	type: yup.string()
})


const useAccomodationFilter = () => {
	const getType = async () => {
		const result = await typeServices.findAll();
		return result;
	};
	const { data: dataType, isSuccess: isSuccessGetType } = useQuery({
		queryKey: ["type"],
		queryFn: getType,
	});

	const { control, setValue } = useForm({
		resolver: yupResolver(Schema)
	});

	return {
		dataType,
		isSuccessGetType,
		control,
		setValue
	};
};

export default useAccomodationFilter;
