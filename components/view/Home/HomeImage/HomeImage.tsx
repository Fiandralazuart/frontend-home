import Image from "next/image";
import React, { forwardRef } from "react";

const HomeImage = forwardRef<HTMLElement, {}>((props, ref) => {
	return (
		// <div className="flex justify-center py-10">
		// 	<Image
		// 		src="/images/general/banner-4.jpg"
		// 		alt="image"
		// 		width={900}
		// 		height={400}
		// 		className=" rounded-3xl"
		// 	/>
		// </div>
		<section ref={ref} id="home" className="px-5 py-10">
			<div className="relative min-w-[100px] min-h-[200px] lg:w-[85%] m-auto lg:h-[500px]">
				<Image
					src="/images/general/banner-6.jpg"
					alt="image"
					fill
					className="object-cover object-center rounded-3xl"
				/>
			</div>
		</section>
	);
});

HomeImage.displayName = "HomeImage";

export default HomeImage;
