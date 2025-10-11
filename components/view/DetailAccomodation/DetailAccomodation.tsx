import React from "react";
import useDetailAccomodation from "./useDetailAccomodation";
import {
	BreadcrumbItem,
	Breadcrumbs,
	Calendar,
	Skeleton,
	useDisclosure,
} from "@heroui/react";
import { convertIDR } from "@/utils/currency";
import { eachDayOfInterval } from "date-fns";
import Image from "next/image";
import { FACILITIES_LIST } from "../admin/accomodation/addAccomodationModal/addAccomodation.constant";
import { LuDot } from "react-icons/lu";
import { Button } from "@heroui/button";
import ReservationModal from "./ReservationModal.tsx";
import CardAccomodation from "@/components/ui/CardAccomodation";
import { skeleton } from "@heroui/theme";
import { today, getLocalTimeZone } from "@internationalized/date";


const DetailAccomodation = () => {
	const {
		dataAccomodation,
		isLoadingAccomodation,
		dataPhotos,
		isLoadingPhotos,
	} = useDetailAccomodation();

	const reservationModal = useDisclosure();

	const ranges = dataAccomodation?.bookedDates?.filter(Boolean) ?? [];

	const disabledDates = ranges.flatMap((range: any) =>
		eachDayOfInterval({
			start: new Date(range.checkIn),
			end: new Date(range.checkOut),
		})
	);

	return (
		<div className="md:px-40 md:py-10 bg-[#F7FAFC]">
			<Skeleton
				isLoaded={!!dataAccomodation?.name}
				className="w-full h-4 p-4 mb-4 rounded-lg "
			>
				<Breadcrumbs>
					<BreadcrumbItem href="/">Home</BreadcrumbItem>
					<BreadcrumbItem href="/event">Accomodation</BreadcrumbItem>
					<BreadcrumbItem>{dataAccomodation?.name}</BreadcrumbItem>
				</Breadcrumbs>
			</Skeleton>
			<section className="mt-8 ">
				<Skeleton
					isLoaded={!!dataAccomodation?.name}
					className="w-full h-4 py-4 mb-4 rounded-lg "
				>
					<h1 className="px-4 mb-2 text-2xl font-bold lg:text-3xl">
						{dataAccomodation?.name}
					</h1>
				</Skeleton>
				<Skeleton
					isLoaded={!!dataAccomodation?.location?.address}
					className="w-[400px] h-4 py-4 mb-4 rounded-lg "
				>
					<div className="text-sm italic lg:text-[17px] flex items-center px-4 gap-2 text-center md:text-start text-[#4F7396]">
						<p>{dataAccomodation?.location?.address}</p>
						<LuDot />
						<p>{convertIDR(dataAccomodation?.price)} / days</p>
					</div>
				</Skeleton>

				<div className="grid grid-cols-1 gap-2 p-2 my-5 auto-cols-fr md:grid-cols-2 lg:grid-cols-5">
					{dataPhotos
						? dataPhotos.map((items: any) => (
								<Image
									key={items.name}
									src={items.image}
									width={250}
									height={120}
									alt="image"
									className="m-auto rounded-xl"
								/>
							))
						: Array.from({ length: 4 }).map((_, index) => (
								<Skeleton
									key={`list-type-skeleton-${index}`}
									className="aspect-video rounded-xl"
								/>
							))}
				</div>
				<div className="p-4">
					<Skeleton
						isLoaded={!!dataAccomodation?.name}
						className="lg:w-[400px] h-4 py-4 mb-4 rounded-lg "
					>
						<h1 className="mb-2 text-2xl font-bold text-center md:text-start">
							About This Place
						</h1>
					</Skeleton>
					<Skeleton
						isLoaded={!!dataAccomodation?.name}
						className="w-full py-4 mb-4 rounded-lg "
					>
						<p className="text-[#4F7396] text-center md:text-start">
							{dataAccomodation?.description}
						</p>
					</Skeleton>
				</div>
				<div className="p-4">
					<Skeleton
						isLoaded={!!dataAccomodation?.name}
						className="lg:w-[400px] h-4 py-4 mb-8 rounded-lg "
					>
						<h1 className="mb-4 text-2xl font-bold text-center md:text-start">
							What This Place Offers
						</h1>
					</Skeleton>

					{dataAccomodation?.facilities ? (
						<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-10 gap-y-4">
							{dataAccomodation?.facilities?.map((facKey: any) => {
								const fac = FACILITIES_LIST.find((f) => f.key === facKey);
								return fac ? (
									<div
										key={`facilities-${fac.key}`}
										className="flex items-center justify-center mx-auto w-full max-w-[200px] gap-2 p-4 border border-gray-300 rounded-lg"
									>
										<span className="text-xl">{fac.icon}</span>
										<span className="font-medium">{fac.label}</span>
									</div>
								) : null;
							})}
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-10 gap-y-4">
							{Array.from({ length: 10 }).map((_, index) => (
								<Skeleton
									key={`list-type-skeleton-${index}`}
									className="h-15 w-[200px] aspect-video rounded-xl"
								/>
							))}
						</div>
					)}
				</div>
				<div className="flex flex-col gap-5 p-4">
					<Skeleton
						isLoaded={!!dataAccomodation?.name}
						className="lg:w-[400px] h-4 py-4 mb-8 rounded-lg "
					>
						<h1 className="mb-4 text-2xl font-bold text-center md:text-start">
							Available Check-In Dates
						</h1>
					</Skeleton>

					{dataAccomodation?.name ? (
						<div className="flex flex-col items-center justify-center gap-4 md:flex-row">
							<Calendar
								isDateUnavailable={(dateValue) => {
									const date = dateValue.toDate("UTC");
									return disabledDates.some(
										(d: any) => d.toDateString() === date.toDateString()
									);
								}}
								minValue={today(getLocalTimeZone())}
							/>
							<Calendar 
								isDateUnavailable={(dateValue) => {
									const date = dateValue.toDate("UTC");
									return disabledDates.some(
										(d: any) => d.toDateString() === date.toDateString()
									);
								}}
								minValue={today(getLocalTimeZone())}
							/>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
							{Array.from({ length: 2 }).map((_, index) => (
								<Skeleton
									key={`list-type-skeleton-${index}`}
									className=" aspect-video rounded-xl"
								/>
							))}
						</div>
					)}
				</div>
				<div className="flex items-center justify-center p-5">
					<Skeleton
						isLoaded={!!dataAccomodation?.name}
						className="flex justify-center w-[400px] h-4 py-4 mb-8 rounded-lg "
					>
						<Button
							onPress={reservationModal.onOpen}
							className="text-xl text-white bg-default-700"
						>
							Book Now
						</Button>
					</Skeleton>
				</div>
				<ReservationModal {...reservationModal} />
			</section>
		</div>
	);
};

export default DetailAccomodation;
