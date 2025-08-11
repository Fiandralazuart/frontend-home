import useChangeUrl from "@/components/hooks/useChangeUrl";
import typeServices from "@/services/type.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useRoomType = () => {
	const router = useRouter();
	const [selectedId, setSelectedId] = useState<string>("")

	const { currentLimit, currentPage, currentSearch } = useChangeUrl();

	const getAllRoomType = async () => {
		let params = `limit=${currentLimit}&page=${currentPage}`;
		if (currentSearch) {
			params += `&search=${currentSearch}`;
		}

		const res = await typeServices.findAll(params);
		const { data } = res;
		return data;
	};

	const {
		data: dataRoomType,
		isLoading: isLoadingType,
		isRefetching: isRefetchingType,
		refetch: refetchType,
	} = useQuery({
		queryKey: ["Type", currentPage, currentLimit, currentSearch],
		queryFn: () => getAllRoomType(),
		enabled: router.isReady && !!currentPage && !!currentLimit,
	});

	return {
		dataRoomType,
		isLoadingType,
		isRefetchingType,
		refetchType,

		selectedId,
		setSelectedId
	};
};

export default useRoomType;
