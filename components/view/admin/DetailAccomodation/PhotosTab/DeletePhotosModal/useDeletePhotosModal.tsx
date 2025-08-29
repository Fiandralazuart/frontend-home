import { ToasterContext } from "@/context/ToasterContex";
import accomodationService from "@/services/accomodation.service";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";


const useDeletePhotosModal = () => {
	const { query } = useRouter()
	const { setToaster } = useContext(ToasterContext)

	const deletePhotos = async (id: string) => {
		const result = await accomodationService.deletePhotos(id)
		return result
	}

	const { mutate: mutateDeletePhotos, isPending: isPendingDeletePhotos, isSuccess: isSuccessDeletePhotos } = useMutation({
		mutationFn: deletePhotos,
		onError: (error) => {
			setToaster({
				type: "error",
				message: error.message
			})
		},
		onSuccess: () => {
			setToaster({
				type: "success",
				message: "Success to delete photos"
			})
		}
	})

	const handleDeletePhotos = (id: string) => mutateDeletePhotos(id)

	const getPhotos = async () => {
		const result = await accomodationService.findAllPhotos()
		return result
	}

	const { data: dataPhotos, refetch: refetchPhotos } = useQuery({
		queryKey: ["photos"],
		queryFn: getPhotos
	})

	return {
		handleDeletePhotos,
		isPendingDeletePhotos,
		isSuccessDeletePhotos,

		dataPhotos,
		refetchPhotos
	};
};

export default useDeletePhotosModal;
