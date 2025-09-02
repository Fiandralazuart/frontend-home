import useChangeUrl from "@/components/hooks/useChangeUrl";
import reservationServices from "@/services/reservation.service";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useRoomType from "../type/useRoomType";
import { useRouter } from "next/router";
import accomodationService from "@/services/accomodation.service";

const useReservation = () => {
	const [selectedId, setSelectedId] = useState<string>("");
	const { currentLimit, currentPage, currentSearch } = useChangeUrl();
	const { isReady } = useRouter();

	const findAllReservation = async () => {
		let params = `limit=${currentLimit}&page=${currentPage}`;
		if (currentSearch) {
			params += `&search=${currentSearch}`;
		}
		const result = await reservationServices.findAll(params);
		const { data } = result;
		return data;
	};

	const {
		data: dataReservation,
		isLoading: isLoadingDataReservation,
		isRefetching: isRefetchingDataReservation,
		refetch: refetchReservation,
	} = useQuery({
		queryKey: ["reservation", currentLimit, currentPage, currentSearch],
		queryFn: findAllReservation,
		enabled: isReady && !!currentLimit && !!currentPage,
	});

	const findAllAccomodation = async () => {
		let params = `limit=${currentLimit}&page=${currentPage}`;
		if (currentSearch) {
			params += `&search=${currentSearch}`;
		}
		const result = await accomodationService.findAll(params);
		return result.data.data;
	};

	const { data: allAccomodation, isLoading: isLoadingAccomodation } = useQuery({
		queryKey: ["accomodation"], // tanpa cellValue, supaya cache digunakan ulang
		queryFn: findAllAccomodation,
		enabled: isReady && !!currentLimit && !!currentPage,
	});


	return {
		dataReservation,
		isLoadingDataReservation,
		isRefetchingDataReservation,
		refetchReservation,

		allAccomodation,
		isLoadingAccomodation,

		selectedId,
		setSelectedId,
	};
};

export default useReservation;
