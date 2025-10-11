import { Button } from "@heroui/button";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import usePayment from "./usePayment";

const Payment = () => {
	const router = useRouter()
	const { order_id, status } = router.query

	const { mutateUpdateTransactionStatus } = usePayment()


	useEffect(() => {
		if(router.isReady) {
			mutateUpdateTransactionStatus()
		}
	}, [router.isReady])

	return (
		<div className="flex flex-col w-full p-4 justify-rowcenter lg:flex-items-center lg:flex-row lg:items-center">
			<div className="flex flex-col items-center justify-center w-full pt-10">
				<Image
					src="/images/general/logo.png"
					alt="logo"
					width={180}
					height={180}
				/>
				<Image
					src={`/images/general/${status === "completed" ? "paymentSuccess" : "paymentFailed"}.png`}
					alt="success"
					className="w-2/3"
					width={1024}
					height={1024}
				/>
			</div>
			<div className="flex flex-col items-center gap-2 text-center lg:w-[700px]">
				<h1 className="text-3xl font-bold capitalize text-default-700">
					Transaction {status}
				</h1>
				<h3 className="text-xl font-bold text-blue-400">
					{status === "completed"
						? "Thank you for complete your payment"
						: "Confirmation Code Invalid"}{" "}
				</h3>
				<Button
					className="mt-4 w-fit"
					variant="bordered"
					color="primary"
					onPress={() => router.push(`/member/transaction/${order_id}`)}
				>
					Check your transaction here
				</Button>
			</div>
		</div>
	);
};

export default Payment;
