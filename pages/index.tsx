import { Button } from "@heroui/button";

import PageHead from "@/components/common/PageHead";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import LandingPageLayout from "@/layouts/LandingPageLayout";
import Home from "@/components/view/Home";

export default function IndexPage() {
	return (
		<LandingPageLayout title="Home Page">
			<Home />
		</LandingPageLayout>

		// <main className="flex items-center justify-center min-h-screen">
		// 	<PageHead />
		// 	<Card className="p-6 bg-white box-shadow: 0 0 50px rgba(0, 0, 0, 0.5) text-default-300">
		// 		<CardHeader>
		// 			<h1 className="text-2xl font-bold text-danger">
		// 				This Page will exist soon
		// 			</h1>
		// 		</CardHeader>
		// 		<CardBody className="flex items-center mt-5">
		// 			<Image
		// 				src="/images/general/logo.png"
		// 				alt="logo"
		// 				width={100}
		// 				height={100}
		// 			/>
		// 			<Image
		// 				src="/images/general/activationFailed-new.png"
		// 				alt="logo"
		// 				width={300}
		// 				height={300}
		// 			/>
					
		// 		</CardBody>
		// 		<CardFooter className="flex flex-col justify-center gap-3">
		// 			<p className="text-xl font-bold text-center text-black">
		// 				We{"'"}re working on it now!
		// 			</p>
		// 			<p className="w-full font-serif text-sm italic font-medium tracking-normal text-center text-gray-400 sm:text-base">
		// 				FixInAja &bull; Home & Service
		// 			</p>
		// 		</CardFooter>
		// 	</Card>
		// 	{/* <Button color="primary">test</Button> */}
		// </main>
	);
}
