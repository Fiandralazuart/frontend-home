import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@heroui/modal";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import useReservationModal from "./useReservationModal";
import { DateRangePicker, Input, Spinner } from "@heroui/react";
import { Button } from "@heroui/button";
import { today, getLocalTimeZone } from "@internationalized/date";
import Script from "next/script";
import environment from "@/config/environment";

interface PropTypes {
	isOpen: boolean;
	onClose: () => void;
	onOpenChange: () => void;
	refetchAccomodation?: () => void;
}

const ReservationModal = (props: PropTypes) => {
	const { isOpen, onClose, onOpenChange, refetchAccomodation } = props;

	const {
		control,
		handleSubmit,
		errors,
		addReservation,
		isLoadingGetAccomodation,
		isPendingAddReservation,
		isSuccessCreateReservation,
		disabledDates,
	} = useReservationModal();

	useEffect(() => {
		if (isSuccessCreateReservation) {
			onClose();
			refetchAccomodation
		}
	});

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			shouldCloseOnInteractOutside={() => false}
			isDismissable={false}
		>
			<Script
				src={environment.MIDTRANS_SNAP_URL}
				data-client-key={environment.MIDTRANS_CLIENT_KEY}
				strategy="afterInteractive"
			/>
			<ModalContent>
				<ModalHeader>
					<p>Reservation Form</p>
				</ModalHeader>
				<ModalBody onClick={(e) => e.stopPropagation()}>
					<form onSubmit={handleSubmit(addReservation)}>
						<div className="flex flex-col gap-2">
							<Controller
								name="dateRange"
								control={control}
								render={({ field }) => (
									<DateRangePicker
										label="Tanggal Check-In / Check-Out"
										value={field.value}
										onChange={field.onChange}
										isInvalid={!!errors.dateRange}
										errorMessage={
											errors.dateRange?.start?.message ||
											errors.dateRange?.end?.message
										}
										minValue={today(getLocalTimeZone())}
										isDateUnavailable={(dateValue) => {
											const date = dateValue.toDate("UTC");
											return disabledDates.some(
												(d: any) => d.toDateString() === date.toDateString()
											);
										}}
									/>
								)}
							/>
							<Controller
								name="notes"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										label="Notes"
										variant="bordered"
										isInvalid={errors.notes !== undefined}
										errorMessage={errors.notes?.message}
									/>
								)}
							/>
							<p className="my-2 text-sm italic text-warning">
								Pay now to confirm and secure your booking.
							</p>

							<Button type="submit" className="text-white bg-default-700">
								{isPendingAddReservation? (
									<Spinner size="md"/>
								): (
									"Booked"
								)}
							</Button>
						</div>
					</form>
				</ModalBody>
				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default ReservationModal;
