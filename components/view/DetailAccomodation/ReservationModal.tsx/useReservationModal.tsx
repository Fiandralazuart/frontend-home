import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { DateValue, getLocalTimeZone } from "@internationalized/date";
import { RangeValue } from "@heroui/react";
import accomodationService from "@/services/accomodation.service";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import reservationServices from "@/services/reservation.service";
import { useContext } from "react";
import { ToasterContext } from "@/context/ToasterContex";
import { eachDayOfInterval } from "date-fns";

interface BookingForm {
	dateRange: RangeValue<DateValue> | null;
	notes?: string;
}

interface AddReservationForm {
	checkIn: string;
	checkOut: string;
	notes: string;
	accomodation: string;
}

// 🔹 Yup schema
const bookingSchema: yup.ObjectSchema<BookingForm> = yup.object({
	dateRange: yup
		.object({
			start: yup
				.mixed<DateValue>()
				.nullable()
				.required("Tanggal check-in wajib diisi"),
			end: yup
				.mixed<DateValue>()
				.nullable()
				.required("Tanggal check-out wajib diisi"),
		})
		.required(),
	notes: yup.string().max(200, "Catatan maksimal 200 karakter"),
});

const useReservationModal = () => {
	const { query, isReady } = useRouter();
	const { setToaster } = useContext(ToasterContext);
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<BookingForm>({
		resolver: yupResolver(bookingSchema),
	});

	const getAccomodationBySlug = async () => {
		const { data } = await accomodationService.getBySlug(`${query.slug}`);
		return data.data;
	};

	const { data: dataAccomodation, isLoading: isLoadingGetAccomodation } =
		useQuery({
			queryKey: ["accomodationBySlug"],
			queryFn: getAccomodationBySlug,
			enabled: isReady
		});

	const ranges = dataAccomodation?.bookedDates?.filter(Boolean) ?? [];

	const disabledDates = ranges.flatMap((range: any) =>
		eachDayOfInterval({
			start: new Date(range.checkIn),
			end: new Date(range.checkOut),
		})
	);

	const createReservation = async (payload: AddReservationForm) => {
		const {data} = await reservationServices.create(payload);
		return data.data;
	};

	const {
		mutate: mutateAddReservation,
		isPending: isPendingAddReservation,
		isSuccess: isSuccessCreateReservation,
	} = useMutation({
		mutationFn: createReservation,
		onError: (error) => {
			setToaster({
				type: "error",
				message: error.message,
			});
		},
		onSuccess: (result) => {
			setToaster({
				type: "success",
				message: "Success to create reservation",
			});
			const transactionToken = result.payment.token;
			(window as any).snap.pay(transactionToken);
			reset();
		},
	});

	const handleReservation = (data: AddReservationForm) =>
		mutateAddReservation(data);

	function dateValueToISO(dateValue: any, hour = 14, minute = 0): string {
		if (!dateValue) return "";

		if (typeof dateValue.toDate === "function") {
			const d: Date = dateValue.toDate(getLocalTimeZone());
			d.setHours(hour, minute, 0, 0);
			return d.toISOString();
		}

		if (
			(typeof dateValue.year === "number" ||
				typeof dateValue.year === "string") &&
			dateValue.month &&
			dateValue.day
		) {
			const date = new Date(
				Date.UTC(
					dateValue.year,
					dateValue.month - 1,
					dateValue.day,
					hour,
					minute,
					0,
					0
				)
			);
			return date.toISOString();
		}

		throw new Error("Unrecognized DateValue: " + JSON.stringify(dateValue));
	}

	const addReservation = (data: BookingForm) => {
		console.log(dataAccomodation);
		if (!data.dateRange || !data.dateRange.start || !data.dateRange.end) {
			console.error("Tanggal belum lengkap");
			return;
		}

		const checkIn = dateValueToISO(data.dateRange.start, 14, 0);
		const checkOut = dateValueToISO(data.dateRange.end, 10, 0);

		const payload: AddReservationForm = {
			checkIn,
			checkOut,
			notes: data.notes ?? "",
			accomodation: `${dataAccomodation._id}`,
		};

		// console.log(query.slug)
		handleReservation(payload);
	};

	return {
		control,
		handleSubmit,
		errors,
		addReservation,
		isLoadingGetAccomodation,
		isPendingAddReservation,
		isSuccessCreateReservation,
		disabledDates
	};
};

export default useReservationModal;
