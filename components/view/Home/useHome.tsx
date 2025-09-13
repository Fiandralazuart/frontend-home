import { DEFAULT_PAGE, LIMIT_BANNER } from "@/constant/list.constant";
import accomodationService from "@/services/accomodation.service";
import bannerServices from "@/services/banner.service";
import typeServices from "@/services/type.service";
import { useQuery } from "@tanstack/react-query";


const useHome = () => {
	const getBanner = async () => {
		const params = `limit=${LIMIT_BANNER}&page=${DEFAULT_PAGE}`;
		const result = await bannerServices.findAll()
		const { data } = result
		return data
	}

	const { data: dataBanner, isLoading: isLoadingBanner} = useQuery({
		queryKey: ['banner'],
		queryFn: getBanner
	})

	const getAccomodation = async () => {
		const params = `limit=${LIMIT_BANNER}&page=${DEFAULT_PAGE}&isPublish=true`;
		const result = await accomodationService.findAll(params) 
		const { data } = result 
		return data
	} 

	const { data: dataAccomodation, isLoading: isLoadingDataAccomodation } = useQuery({
		queryKey: ["accomodation"],
		queryFn: getAccomodation
	})

	const getType = async () => {
		const params = `limit=${LIMIT_BANNER}&page=${DEFAULT_PAGE}&isPublish=true`;
		const result = await typeServices.findAll(params) 
		const { data } = result 
		return data
	} 

	const { data: dataType, isLoading: isLoadingDataType } = useQuery({
		queryKey: ["type"],
		queryFn: getType
	})

	return {
		dataBanner,
		isLoadingBanner,
		dataAccomodation,
		isLoadingDataAccomodation,
		dataType,
		isLoadingDataType,
	};
};

export default useHome;
