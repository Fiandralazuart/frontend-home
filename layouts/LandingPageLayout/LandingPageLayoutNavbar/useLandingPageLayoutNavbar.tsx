import useDebounce from "@/components/hooks/useDebounce";
import { DEFAULT_LIMIT, DEFAULT_PAGE, DELAY } from "@/constant/list.constant";
import accomodationService from "@/services/accomodation.service";
import authServices from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";


const useLandingPageLayoutNavbar = () => {
	const [search, setSearch] = useState("")
	const debounce = useDebounce()
	const router = useRouter()

	const getProfile = async () => {
		const result = await authServices.getProfile()
		return result.data.data
	}

	const { data: dataProfile, refetch: RefetchDataProfile} = useQuery({
		queryKey: ["Profile"],
		queryFn: getProfile,
		enabled: router.isReady
	})

	const getAccomodationBySearch = async () => {
		let params = `&search=${search}&limit=${DEFAULT_LIMIT}&page=${DEFAULT_PAGE}&isPublish=true`
		const result = await accomodationService.findAll(params)
		const { data } = result
		return data
	}

	const { data: dataAccomodationSearch, refetch: RefetchDataAccomodationSearch, isLoading: isLoadingAccomodationSearch,  isRefetching: isRefetchingAccomodationSearch} = useQuery({
		queryKey: ["AccomodationSearch", search],
		queryFn: getAccomodationBySearch,
		enabled: !!search
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
			debounce(() => setSearch(e.target.value), DELAY)
		}
	
	return {
		dataProfile,
		RefetchDataProfile,
		dataAccomodationSearch,
		RefetchDataAccomodationSearch,
		isRefetchingAccomodationSearch,
		isLoadingAccomodationSearch,
		handleSearch,
		search,
		setSearch,
	};
};

export default useLandingPageLayoutNavbar;
