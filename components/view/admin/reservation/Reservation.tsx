import DropDownActions from "@/components/common/DropDownActions";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
import useReservation from "./useReservation";
import DataTable from "@/components/ui/DataTable";
import COLUMN_LIST_RESERVATION from "./Reservation.constant";
import useChangeUrl from "@/components/hooks/useChangeUrl";
import { convertToDateStandart } from "@/utils/convert";
import DeleteReservationModal from "./DeleteReservationModal.tsx";
interface PropTypes {
	cellValue: string;
}

const Reservation = () => {
	const { query, push, isReady } = useRouter();

	const {
		dataReservation,
		isLoadingDataReservation,
		isRefetchingDataReservation,
		refetchReservation,

		allAccomodation,
		isLoadingAccomodation,

		selectedId,
		setSelectedId,
	} = useReservation();

	const { setUrl } = useChangeUrl();

	useEffect(() => {
		if (isReady) setUrl();
	}, [isReady]);

	const getColor = (value: string) => {
		if (value === "completed") {
			return "success";
		} else if (value === "pending") {
			return "warning";
		} else {
			return "danger";
		}
	};
	const getStatus = (value: string) => {
		if (value === "completed") {
			return "Lunas";
		} else if (value === "pending") {
			return "Pending";
		} else {
			return "Dibatalkan";
		}
	};

	const deleteReservationModal = useDisclosure();

	const renderCell = useCallback(
		(reservation: Record<string, unknown>, columnKey: Key) => {
			const cellValue = reservation[columnKey as keyof typeof reservation];
			switch (columnKey) {
				case "accomodation":
					return (cellValue as any)?.name || "-";
				case "checkIn":
					return `${convertToDateStandart(cellValue as Date)}`;
				case "checkOut":
					return `${convertToDateStandart(cellValue as Date)}`;
				case "status":
					return (
						<Chip
							color={`${getColor(cellValue as string)}`}
							size="sm"
							variant="flat"
						>
							{getStatus(cellValue as string)}
						</Chip>
					);
				case "actions":
					return (
						<DropDownActions
							onPressButtonDetails={() =>
								push(`/admin/reservation/${reservation._id}`)
							}
							onPressButtonDelete={() => {
								setSelectedId(`${reservation.transactionId}`);
								deleteReservationModal.onOpen();
							}}
						/>
					);
				default:
					return cellValue as ReactNode;
			}
		},
		[push]
	);

	return (
		<section>
			{Object.keys(query).length > 0 && (
				<DataTable
					data={dataReservation?.data || []}
					columns={COLUMN_LIST_RESERVATION}
					renderCell={renderCell}
					isLoading={isLoadingDataReservation}
					buttonTopContent="Add Accomodation"
					onClickbuttonTopContent={() => {}}
					emptyContent="Reservation is Empty"
					totalPages={dataReservation?.pagination.totalPages}
					searchPlaceholder="Search Reservation"
					displaySearch={false}
					displayAddButton={false}
				/>
			)}
			<DeleteReservationModal
				{...deleteReservationModal}
				refetchReservation={refetchReservation}
				selectedId={selectedId}
				setSelectedId={setSelectedId}
			/>
		</section>
	);
};

export default Reservation;
