import { IBanner } from '@/types/banner';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import "swiper/css"
import "swiper/css/pagination"
import { Skeleton } from '@heroui/react';

interface PropTypes {
	banners: IBanner[];
	isLoadingBanner: boolean;
}

const HomeSlider = (props: PropTypes) => {
	const { banners, isLoadingBanner } = props;
	return (
		<div className="py-10 mx-6 mb-6 aspect-video lg:mx-0 lg:mb-16">
			{!isLoadingBanner ? (
				<Swiper
					pagination={{
						dynamicBullets: true,
						clickable: true,
					}}
					spaceBetween={30}
					loop
					modules={[Autoplay, Pagination]}
					className='w-[1000px] h-[700px]'
					autoplay={{
						delay: 3000,
						disableOnInteraction: false
					}}
				>
					{banners?.map((banner: IBanner) => (
						<SwiperSlide key={banner._id}>
							<Image
								src={`${banner.banner}`}
								alt={`${banner.title}`}
								width={1920}
								height={800}
								className='h-[100%] rounded-2xl w-full object-cover lg:h-[100%]'
							/>
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				<Skeleton className='h-[90%] w-full rounded-2xl'/>
			)}
		</div>
	);
};

export default HomeSlider;
