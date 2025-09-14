import React from "react";
import useDetailAccomodation from "./useDetailAccomodation";
import { BreadcrumbItem, Breadcrumbs, Calendar, Skeleton } from "@heroui/react";
import { convertIDR } from "@/utils/currency";
import { DiDotnet } from "react-icons/di";
import Image from "next/image";
import { FACILITIES_LIST } from "../admin/accomodation/addAccomodationModal/addAccomodation.constant";
import { LuDot } from "react-icons/lu";
import { Button } from "@heroui/button";
const DetailAccomodation = () => {
	const {
		dataAccomodation,
		isLoadingAccomodation,
		dataPhotos,
		isLoadingPhotos,
	} = useDetailAccomodation();

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
				<h1 className="px-4 mb-2 text-3xl font-bold">{dataAccomodation?.name}</h1>
				<div className="text-sm italic lg:text-[17px] flex items-center px-4 gap-2 text-center md:text-start text-[#4F7396]">
					<p>{dataAccomodation?.location?.address}</p>
					<LuDot />
					<p>{convertIDR(dataAccomodation?.price)} / days</p>
				</div>
				<div className="grid grid-cols-1 gap-2 p-2 my-5 auto-cols-fr md:grid-cols-5 ">
					{dataPhotos &&
						dataPhotos.map((items: any) => (
							<Image
								key={items.name}
								src={items.image}
								width={250}
								height={120}
								alt="image"
								className="m-auto rounded-xl"
							/>
						))}
				</div>
				<div className="p-4">
					<h1 className="mb-2 text-2xl font-bold text-center md:text-start">About This Place</h1>
					<p className="text-[#4F7396] text-center md:text-start">{dataAccomodation?.description}</p>
				</div>
				<div className="p-4">
					<h1 className="mb-4 text-2xl font-bold text-center md:text-start">What This Place Offers</h1>
					<div className="grid grid-cols-1 md:grid-cols-5 gap-x-10 gap-y-4">
						{dataAccomodation?.facilities?.map((facKey: any) => {
							const fac = FACILITIES_LIST.find((f) => f.key === facKey);
							return fac ? (
								<div
									key={`facilities-${fac.key}`}
									className="flex items-center justify-center mx-auto w-[200px] gap-2 p-4 border border-gray-300 rounded-lg"
								>
									<span className="text-xl">{fac.icon}</span>
									<span className="font-medium">{fac.label}</span>
								</div>
							) : null;
						})}
					</div>
				</div>
				<div className="p-4">
					<h1 className="mb-4 text-2xl font-bold text-center md:text-start">Available Check-In Dates</h1>
					<div className="flex flex-col items-center justify-center gap-4 md:flex-row">
						<Calendar />
						<Calendar />
					</div>
				</div>
				<div className="flex justify-center p-5">
					<Button className="text-xl text-white bg-default-700">
						Book Now
					</Button>
				</div>
			</section>
		</div>
	);
};

export default DetailAccomodation;
