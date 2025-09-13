import Image from "next/image";
import React from "react";
import { NAV_ITEMS, SOCIAL_ITEMS } from "../LandingPageLayout.constant";
import Link from "next/link";
import { useRouter } from "next/router";

const LandingPageLayoutFooter = () => {
	const router = useRouter()
	return (
		<div className="bg-[rgb(12,12,33)] px-7 py-10 bottom-0">
			<div className="flex flex-col justify-center gap-10 mb-10 text-gray-400 lg:items-start lg:flex-row lg:gap-35">
				<div className="flex mx-auto lg:mx-0 items-center justify-center w-[250px] lg:w-[310px] bg-white  h-30 rounded-2xl">
					<Image
						src="/images/general/logono.png"
						width={300}
						height={200}
						alt="logo"
					/>
				</div>

				<div>
					<p className="mb-4 text-xl max-w-[600px]">
						More than just temporary housing, FixInAja provides a complete
						living experience with integrated home services that bring
						convenience, comfort, and peace of mind.
					</p>
					<div className="flex gap-2">
						{SOCIAL_ITEMS.map((items) => (
							<Link
								key={`footer-social-${items.label}`}
								href={items.href}
								className="text-3xl hover:text-white"
							>
								{items.icon}
							</Link>
						))}
					</div>
				</div>

				<div className="w-[200px]">
					<p className="text-xl font-bold text-white">Quick Link</p>
					{NAV_ITEMS.map((items) => (
						<div key={`footer-${items.label}`}>
							<a
								onClick={(e) => {
									if (items.scroll) {
										e.preventDefault(); // cegah reload
										const el = document.getElementById(items.scroll);
										if (el) {
											el.scrollIntoView({ behavior: "smooth" });
										}
									} else if (items.href) {
										router.push(items.href);
									}
								}}
								href={items.scroll}
							>
								{items.label}
							</a>
						</div>
					))}
				</div>
			</div>
			<div className="py-3 border-t-2 border-gray-800">
				<p className="text-sm italic font-medium tracking-normal text-center text-white ont-serif sm:text-base">
					&copy; 2025 FixInAja. All right reserved.
				</p>
			</div>
		</div>
	);
};

export default LandingPageLayoutFooter;
