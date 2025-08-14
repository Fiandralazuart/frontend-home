import { ToasterContext } from "@/context/ToasterContex";
import typeServices from "@/services/type.service";
import { IRoomType } from "@/types/type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailType = () => {
	const { isReady, query } = useRouter();
	const { setToaster } = useContext(ToasterContext);

	const getTypeById = async () => {
		const { data } = await typeServices.findById(`${query.id}`);
		return data.data;
	};

	const { data: dataType, refetch: refetchType } = useQuery({
		queryKey: ["Type"],
		queryFn: getTypeById,
		enabled: isReady,
	});

	const updateType = async (payload: IRoomType) => {
		const { data } = await typeServices.update(`${query.id}`, payload);
		return data.data;
	};
	const {
		mutate: mutateUpdateType,
		isPending: isPendingUpdateType,
		isSuccess: isSuccessUpdateType,
	} = useMutation({
		mutationFn: (payload: IRoomType) => updateType(payload),
		onError: (error) => {
			setToaster({
				type: "error",
				message: error.message,
			});
		},
		onSuccess: () => {
			refetchType();
			
			setToaster({
				type: "success",
				message: "Success to update this type",
			});
		},
	});

	const handleUpdate = (data: IRoomType) => mutateUpdateType(data);
	return {
		dataType,
		isPendingUpdateType,
		isSuccessUpdateType,
		handleUpdate,
	};
};

export default useDetailType;
