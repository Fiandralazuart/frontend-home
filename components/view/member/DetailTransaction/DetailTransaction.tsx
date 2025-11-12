import React from "react";
import useDetailTransaction from "./useDetailTransaction";
import { Card, CardBody } from "@heroui/card";
import Script from "next/script";
import environment from "@/config/environment";
import { Chip, Skeleton } from "@heroui/react";
import { convertIDR } from "@/utils/currency";
import { Button } from "@heroui/button";
import { QRCodeSVG } from "qrcode.react";
import { date } from "yup";
import Link from "next/link";

const DetailTransaction = () => {
	const {
		dataReservation,
		isLoadingDataReservation,
		dataAccomodation,
		isLoadingDataAccomodation,
	} = useDetailTransaction();

	console.log(dataAccomodation?.location?.link)

	const dateIn = new Date(dataReservation?.checkIn).toLocaleDateString("id-ID", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
	const dateOut = new Date(dataReservation?.checkOut).toLocaleDateString(
		"id-ID",
		{
			day: "2-digit",
			month: "long",
			year: "numeric",
		}
	);
	return (
		<Card className="px-5 py-4">
			<Script
				src={environment.MIDTRANS_SNAP_URL}
				data-client-key={environment.MIDTRANS_CLIENT_KEY}
				strategy="lazyOnload"
			/>
			<CardBody className="gap-8">
				<div className="flex flex-col gap-2">
					<h4 className="font-bold">Transaction:</h4>
					<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
						<div>
							<p className="text-sm font-semibold">Transaction ID:</p>
							<Skeleton
								isLoaded={!!dataReservation?.transactionId}
								className="h-4 rounded-md"
							>
								<p className="text-sm">{dataReservation?.transactionId}</p>
							</Skeleton>
						</div>
						<div>
							<p className="text-sm font-semibold">Total Nights:</p>
							<Skeleton
								isLoaded={!!dataReservation?._id}
								className="h-4 rounded-md"
							>
								<p className="text-sm">{`${dataReservation?.totalNight} Night`}</p>
							</Skeleton>
						</div>
						<div>
							<p className="text-sm font-semibold">Total:</p>
							<Skeleton
								isLoaded={!!dataReservation?.totalPrice}
								className="h-4 rounded-md"
							>
								<p className="text-sm">{`${convertIDR(dataReservation?.totalPrice)}`}</p>
							</Skeleton>
						</div>
						<div>
							<p className="text-sm font-semibold">Status:</p>
							<Skeleton
								isLoaded={!!dataReservation?.status}
								className="h-4 rounded-md"
							>
								<Chip
									className="capitalize"
									color={
										dataReservation?.status === "completed"
											? "success"
											: "warning"
									}
									variant="flat"
									size="sm"
								>
									{dataReservation?.status}
								</Chip>
							</Skeleton>
						</div>
					</div>
				</div>

				{dataReservation?.status === "completed" && dataAccomodation?.location?.link && (
					<Card>
						<CardBody className="flex gap-6 md:flex-row">
							<div className="max-w-[300px] md:w-[300px]">
								<QRCodeSVG
									value={dataReservation?.invoice?.invoiceId}
									className="!h-full !w-full"
								/>
							</div>
							<div className="flex flex-col w-full gap-4">
								<h1 className="text-2xl font-bold md:text-3xl">{dataAccomodation?.name}</h1>
								<div className="flex flex-col gap-2 font-semibold md:flex-row md:gap-10">
									<div>
										<h1>Check-In:</h1>
										<p className="text-default-500">{dateIn}</p>
									</div>
									<div>
										<h1>Check-Out:</h1>
										<p className="text-default-500">{dateOut}</p>
									</div>
								</div>
								<div className="font-semibold">
									<h1>Location:</h1>
									<p className="text-default-500">
										{dataAccomodation?.location?.address}
									</p>
								</div>
									<Button  as={Link} href={dataAccomodation?.location?.link} className="w-[100px] text-white bg-default-700">Maps</Button>
							</div>
						</CardBody>
					</Card>
				)}

				{dataReservation?.status === "pending" && (
					<Button
						color="danger"
						className="w-fit"
						onPress={() =>
							(window as any).snap.pay(dataReservation?.payment?.token)
						}
					>
						Pay Now
					</Button>
				)}
			</CardBody>
		</Card>
	);
};

export default DetailTransaction;