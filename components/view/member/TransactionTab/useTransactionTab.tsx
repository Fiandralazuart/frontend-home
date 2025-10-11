import useChangeUrl from "@/components/hooks/useChangeUrl";
import reservationServices from "@/services/reservation.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTransactionTab = () => {
	
	const getMemberTransaction = async () => {
		const result = await reservationServices.findByMember();
		const { data } = result;
		return data;
	};

	const {
		data: dataReservation,
		isLoading: isLoadingDataReservation,
		isRefetching: isRefetchingDataReservation,
		refetch: refetchReservation,
	} = useQuery({
		queryKey: ["ReservationByMember"],
		queryFn: getMemberTransaction,
	});

	return {
		dataReservation,
		isLoadingDataReservation,
		isRefetchingDataReservation,
		refetchReservation
	};
};

export default useTransactionTab;
