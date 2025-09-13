import React, { forwardRef } from "react";
import { CONTACT_LIST, MESSAGE_LIST } from "./HomeContact.constant";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';


import "swiper/css"
import "swiper/css/pagination"
import Image from "next/image";

const HomeContact = forwardRef<HTMLElement, {}>((props, ref) => {
	return (
		<section ref={ref} id="contact" className="flex flex-col-reverse gap-10 lg:flex-row lg:gap-[30rem] p-10 py-20">
			<div  className="flex flex-col justify-center gap-5">
				<div className="max-w-[600px]">
					<h1 className="mb-4 text-lg font-bold lg:text-2xl">Contact Us - FixInAja Home & Service</h1>
					<p className="text-lg text-[rgb(79,115,150)] font-semibold">
						Punya pertanyaan, saran, atau butuh bantuan? 
						<br />
						Kami siap membantu Anda.
					</p>
				</div>
				<div className="flex flex-col gap-3">
					{CONTACT_LIST.map((items) => (
						<div key={items.key} className="flex gap-4">
							<div className="flex items-center justify-center text-[rgb(63,63,70)]">
								{items.icon}
							</div>
							<div>
								<h1 className="font-bold">{items.label}</h1>
								<p className="text-[rgb(79,115,150)] font-semibold">{items.value}</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="flex items-center justify-center">
				<Swiper
					pagination={{
						dynamicBullets: true,
						clickable: true,
					}}
					spaceBetween={30}
					loop
					modules={[Autoplay]}
					className='w-[380px] h-auto flex- justify-center items-center'
					autoplay={{
						delay: 5000,
						disableOnInteraction: false
					}}
				>
					{MESSAGE_LIST.map((items) => (
						<SwiperSlide key={`message-${items.key}`}>
							<Card className="max-w-[380px] lg:w-[350px] shadow-lg p-6 mt-2 mx-auto">
								<CardHeader className="flex justify-center">
									<Image src={items.image} width={100} height={100} alt="image" className="object-cover rounded-full aspect-square" />
								</CardHeader>
								<CardBody className="text-[rgb(79,115,150)] text-center my-5 italic">
									{items.description}
								</CardBody>
								<CardFooter className="flex flex-col">
									<p className="text-sm font-bold text-center lg:text-md">{items.name}</p>
									<p className="font-semibold text-[rgb(79,115,150)] text-sm text-center lg:text-md">{items.job}</p>
								</CardFooter>
							</Card>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
});
HomeContact.displayName = "HomeContact";
export default HomeContact;
