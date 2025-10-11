import accomodationService from "@/services/accomodation.service";
import reservationServices from "@/services/reservation.service";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

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
		queryKey: ["dataReservation"],
		queryFn: getReservation,
		enabled: isReady,
	});

	const getAccomodation = async () => {
		const {data} = await accomodationService.getById(dataReservation.accomodation)
		return data.data
	}
	const {
		data: dataAccomodation,
		isLoading: isLoadingDataAccomodation,
	} = useQuery({
		queryKey: ["dataAccomodation"],
		queryFn: getAccomodation,
		enabled: !!dataReservation?._id
	});
	return {
		dataReservation,
		isLoadingDataReservation,
		dataAccomodation,
		isLoadingDataAccomodation,
	};
};

export default useDetailTransaction;
