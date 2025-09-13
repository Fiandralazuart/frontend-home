
import CardAccomodation from '@/components/ui/CardAccomodation';
import { IAccomodation } from '@/types/accomodation';
import Link from 'next/link';
interface PropTypes {
	title: string;
	accomodation: IAccomodation[];
	isLoadingAccomodation: boolean;
	urlMore: string;
}

const HomeAccomodationList = (props: PropTypes) => {
	const { title, accomodation, isLoadingAccomodation, urlMore = "/event" } = props;
	return (
		<section className="mb-16">
			<div className="flex items-center justify-between px-6 mb-2 lg:px-32">
				<h2 className="font-bold text-black text-md md:text-2xl">{title}</h2>
				<Link href={urlMore} className="text-sm font-semibold lg:text-xl text-foreground-500">
					See More
				</Link>
			</div>
			<div className="grid auto-cols-[20rem] grid-flow-col gap-6 overflow-x-auto py-2 pb-4 lg:grid-cols-4 lg:px-20">
				{!isLoadingAccomodation
					? accomodation?.map((accomodation) => (
							<CardAccomodation
								accomodation={accomodation}
								key={`card-accomodation-${accomodation._id}`}
								className="first:ml-2 last:mr-2 lg:first:ml-2 lg:last:mr-2"
							/>
						))
					: Array.from({ length: 4 }).map((_, index) => (
							<CardAccomodation
								key={`accomodation-loading-${index}`}
								isLoading={isLoadingAccomodation}
								className="first:ml-2 last:mr-2 lg:first:ml-4 lg:last:mr-4"
							/>
						))}
			</div>
		</section>
	);
};

export default HomeAccomodationList;
