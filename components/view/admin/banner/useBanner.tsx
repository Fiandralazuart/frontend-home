import useChangeUrl from "@/components/hooks/useChangeUrl";
import bannerServices from "@/services/banner.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";


const useBanner = () => {
	const { isReady } = useRouter()
	const { currentLimit, currentPage, currentSearch } = useChangeUrl()
	const [selectedId, setSelectedId] = useState<string>("")

	const findBanner = async () => {
		let params = `limit=${currentLimit}&page=${currentPage}`
		if(currentSearch){
			params += `&search=${currentSearch}`
		}

		const result = await bannerServices.findAll(params)
		const { data } = result
		return data 
	}

	const { data: dataBanner, refetch: refetchBanner, isLoading: isLoadingBanner, isRefetching: isRefetchingBanner } = useQuery({
		queryKey: ["banner", currentLimit, currentPage, currentSearch],
		queryFn: findBanner,
		enabled: isReady && !!currentLimit && !!currentPage
	})
	
	return {
		dataBanner,
		refetchBanner,
		isRefetchingBanner,
		isLoadingBanner,

		selectedId,
		setSelectedId,
	};
};

export default useBanner;
