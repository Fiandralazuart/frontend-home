import React, { forwardRef } from "react";
import { ABOUT_LIST } from "./HomeAbout.constant";
import { Card, CardBody, CardHeader } from "@heroui/card";
import Image from "next/image";

const HomeAbout = forwardRef<HTMLElement, {}>((props, ref) => {
	return (
		<section ref={ref} id="about" className="flex flex-col-reverse justify-center gap-20 px-10 py-20 lg:flex-row">
			<div className="flex flex-col gap-5">
				<div className="flex flex-col gap-1 max-w-[600px] text-[rgb(79,115,150)] ">
					<h1 className="mb-5 text-lg font-bold text-black lg:text-xl">About FixInAja Home & Service</h1>
					<p className="text-sm lg:text-lg">
						FixInAja Home & Service adalah platform digital yang membantu
						menemukan solusi praktis untuk kebutuhan reservasi layanan
						akomodasi, semuanya bisa dilakukan dengan mudah, cepat, dan
						terpercaya.
					</p>
					<p className="text-sm lg:text-lg">
						Kami percaya bahwa setiap orang berhak mendapatkan layanan yang
						solutif, transparan, dan nyaman. FixInAja hadir sebagai
						partner andalan dalam mengatur layanan Anda.
					</p>
				</div>
				<div className="grid gap-4 auto-cols-auto lg:grid-cols-2">
					{ABOUT_LIST.map((items) => (
						<Card key={`about-${items.label}`}>
							<CardHeader className="px-5 font-bold">{items.label}</CardHeader>
							<CardBody className="px-5 pt-0 text-[rgb(79,115,150)] font-semibold">{items.value}</CardBody>
						</Card>
					))}
				</div>
			</div>
			<div className="flex items-center justify-center">
				<Image src="/images/general/banner-6.jpg" width={750} height={500} alt="image" className="rounded-xl" />
			</div>
		</section>
	);
});

HomeAbout.displayName = "HomeAbout";

export default HomeAbout;
