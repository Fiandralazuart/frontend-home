import useChangeUrl from "@/components/hooks/useChangeUrl";
import accomodationService from "@/services/accomodation.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const usePhotosTab = () => {
	const [selectedId, setSelectedId] = useState<string>("")
	const { isReady, query } = useRouter();

	console.log(query.id)

	const getPhotos = async () => {
		const id = `${query.id}`
		const result = await accomodationService.findAllPhotosByAccomodation(id);
		const { data } = result
		return data
	};

	const { data: dataPhotos, refetch: refetchPhotos, isRefetching: isRefetchingPhotos, isLoading: isLoadingPhotos} = useQuery({
		queryKey: ["Photos"],
		queryFn: getPhotos,
		enabled: isReady
	})

	console.log(dataPhotos)

	return {
		dataPhotos,
		refetchPhotos,
		isRefetchingPhotos,
		isLoadingPhotos,
		
		selectedId,
		setSelectedId
	};
};

export default usePhotosTab;
