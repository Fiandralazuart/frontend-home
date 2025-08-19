import { ToasterContext } from "@/context/ToasterContex";
import accomodationService from "@/services/accomodation.service";
import { IAccomodation, IAccomodationForm } from "@/types/accomodation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";



const useDetailAccomodation = () => {
	const { query, isReady } = useRouter()
	const { setToaster } = useContext(ToasterContext)

	const getAccomodationById = async () => {
		const { data } = await accomodationService.getById(`${query.id}`)
		return data.data
	}

	const { data: dataAccomodation, refetch: refectAccomodation } = useQuery({
		queryFn: getAccomodationById,
		queryKey: ["Accomodation"],
		enabled: isReady,
	})

	const updateAccomodation = async (payload: IAccomodation) => {
		const result = await accomodationService.update(`${query.id}`, payload)
		return result
	}
	const { mutate: mutateUpdateAccomodation, isPending: isPendingUpdateAcconmodation, isSuccess: isSuccessUpdateAccomodation} = useMutation({
		mutationFn: updateAccomodation,
		onError: (error) => {
			setToaster({
				type: "error",
				message: error.message
			})
		},
		onSuccess: () => {
			refectAccomodation()
			setToaster({
				type: "success",
				message: "Success to update accomodation"
			})
		}
	})
	const handleUpdateAccomodation = (data: IAccomodation) => mutateUpdateAccomodation(data)
	
	const { data: dataDefaultRegion, isPending: isPendingDefaultRegion } = useQuery({
		queryKey: ['defaultRegion'],
		queryFn: () => accomodationService.getRegencyById(dataAccomodation?.location?.region),
		enabled: !!dataAccomodation?.location?.region,
	});

	const handleUpdateLocation = (data: IAccomodationForm) => {
		const payload = {
			location: {
				address: `${data?.address}`,
				region: `${data?.region}`,
				link: `${data?.link}`,
				
			},
		};
		mutateUpdateAccomodation(payload);
	};

	return {
		dataDefaultRegion,
		dataAccomodation,
		handleUpdateAccomodation,
		isPendingUpdateAcconmodation,
		isSuccessUpdateAccomodation,
		handleUpdateLocation
	};
};

export default useDetailAccomodation;
