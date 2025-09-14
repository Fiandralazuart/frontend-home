import accomodationService from "@/services/accomodation.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";


const useDetailAccomodation = () => {
	const { query, isReady } = useRouter()

	const getAccomodationBySlug = async () => {
		const { data } = await accomodationService.getBySlug(`${query.slug}`)
		return data.data
	}
	const { data: dataAccomodation, isLoading: isLoadingAccomodation } = useQuery({
		queryKey: ["accomodation"],
		queryFn: getAccomodationBySlug,
		enabled: isReady
	})


	const getPhotosByAccomodation = async () => {
		const id = `${dataAccomodation?._id}`
		console.log(id)
		const { data } = await accomodationService.findAllPhotosByAccomodation(id)
		return data.data
	}

	const { data: dataPhotos, isLoading: isLoadingPhotos } = useQuery({
		queryKey: ["photos"],
		queryFn: getPhotosByAccomodation,
		enabled: !!dataAccomodation?._id
	})

	return {
		dataAccomodation,
		isLoadingAccomodation,
		dataPhotos,
		isLoadingPhotos,
	};
};

export default useDetailAccomodation;
