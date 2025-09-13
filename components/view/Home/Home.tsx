import React, { useEffect, useRef, useState } from "react";
import useHome from "./useHome";
import HomeSlider from "./HomeSlider";
import HomeImage from "./HomeImage";
import HomeAccomodationList from "./HomeAccomodation";
import HomeTypeList from "./HomeTypeList";
import HomeAbout from "./HomeAbout";
import HomeContact from "./HomeContact";

const Home = () => {
	const {
		dataBanner,
		isLoadingBanner,
		dataAccomodation,
		isLoadingDataAccomodation,
		dataType,
		isLoadingDataType,
	} = useHome();

	const homeRef = useRef<HTMLElement | null>(null);
	const aboutRef = useRef<HTMLElement | null>(null);
	const contactRef = useRef<HTMLElement | null>(null);

	const [active, setActive] = useState("home");

	const sections = [
		{ id: "home", ref: homeRef },
		{ id: "about", ref: aboutRef },
		{ id: "contact", ref: contactRef },
	];

	useEffect(() => {
		const handleScroll = () => {
			sections.forEach(({ id, ref }) => {
				if (ref.current) {
					const rect = ref.current.getBoundingClientRect();
					if (rect.top <= 150 && rect.bottom >= 150) {
						setActive(id);
					}
				}
			});
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div>
			<HomeImage ref={homeRef}/>

			<HomeAccomodationList
				title="Best Accomodation"
				accomodation={dataAccomodation?.data}
				isLoadingAccomodation={isLoadingDataAccomodation}
				urlMore="/accomodation"
			/>

			<HomeTypeList type={dataType?.data} isLoadingType={isLoadingDataType} />

			<HomeAbout ref={aboutRef} />

			<HomeContact ref={contactRef} />

			{/* <HomeSlider
				banners={dataBanner?.data}
				isLoadingBanner={isLoadingBanner}
			/> */}
		</div>
	);
};

export default Home;
