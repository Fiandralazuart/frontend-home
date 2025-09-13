import useChangeUrl from "@/components/hooks/useChangeUrl";
import accomodationService from "@/services/accomodation.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useAccomodation = () => {
	const router = useRouter();
	const { currentLimit, currentPage, currentType } = useChangeUrl();

	const getAccomodation = async () => {
		const params = `limit=${currentLimit}&page=${currentPage}&isPublish=true&type=${currentType}`;
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
		queryKey: ["accomodation", currentPage, currentLimit, currentType ],
		queryFn: getAccomodation,
		enabled: router.isReady && !!currentPage && !!currentLimit,
	});

	return {
		dataAccomodation,
		isLoadingGetAccomodation,
		isRefetchingAccomodation,
		refetchAccomodation,
	};
};

export default useAccomodation;
