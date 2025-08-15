import useChangeUrl from "@/components/hooks/useChangeUrl";
import accomodationService from "@/services/accomodation.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";


const useAccomodation = () => {
	const [selectedId, setSelectedId] = useState<string>("");
	const { isReady } = useRouter();

	const { currentLimit, currentPage, currentSearch } = useChangeUrl();

	const getAccomodation = async () => {
		let params = `limit=${currentLimit}&page=${currentPage}`;
		if (currentSearch) {
			params += `&search=${currentSearch}`;
		}
		const result = await accomodationService.findAll(params);
		const { data } = result;
		return data;
	};

	const {
		data: dataAccomodation,
		isLoading: isLoadingGetAccomodation,
		isRefetching: isRefetchingAccomodation,
		refetch: refetchAccomodation,
	} = useQuery({
		queryKey: ["Accomodation", currentLimit, currentPage, currentSearch],
		queryFn: () => getAccomodation(),
		enabled: isReady && !!currentLimit && !!currentPage,
	});


	return {
		dataAccomodation,
		isLoadingGetAccomodation,
		isRefetchingAccomodation,
		refetchAccomodation,

		selectedId,
		setSelectedId,
	};
};

export default useAccomodation;
