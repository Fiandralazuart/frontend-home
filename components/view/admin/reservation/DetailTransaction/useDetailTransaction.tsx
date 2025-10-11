import accomodationService from "@/services/accomodation.service";
import reservationServices from "@/services/reservation.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailTransaction = () => {
	const { query, isReady } = useRouter();
	const getReservation = async () => {
		const { data } = await reservationServices.findById(
			`${query.id}`
		);
		return data.data;
	};

	const {
		data: dataReservation,
		isLoading: isLoadingDataReservation,
	} = useQuery({
		queryKey: ["dataReservation", query.id],
		queryFn: getReservation,
		enabled: isReady && !!query.id,
	});

	const getAccomodation = async () => {
		const {data} = await accomodationService.getById(dataReservation.accomodation)
		return data.data
	}
	const {
		data: dataAccomodation,
		isLoading: isLoadingDataAccomodation,
	} = useQuery({
		queryKey: ["dataAccomodation", dataReservation?.accomodation],
		queryFn: getAccomodation,
		enabled: !!dataReservation?.accomodation,
	});
	return {
		dataReservation,
		isLoadingDataReservation,
		dataAccomodation,
		isLoadingDataAccomodation,
	};
};

export default useDetailTransaction;
