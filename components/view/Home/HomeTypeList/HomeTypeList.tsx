import { IRoomType } from '@/types/type';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Skeleton } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

interface PropTypes {
	type: IRoomType[];
	isLoadingType: boolean;
}

const HomeTypeList = (props: PropTypes) => {
	const { type, isLoadingType } = props;

	return (
		<Card className="p-8 mx-6 mb-8 lg:mx-20">
			<CardHeader className="p-0">
				<h1 className="text-2xl font-bold text-black">Accomodation By Type</h1>
			</CardHeader>
			<CardBody className="p-0 mt-4">
				<div className="grid auto-cols-[9rem] grid-flow-col gap-4 overflow-x-auto lg:grid-cols-6">
					{!isLoadingType && type ? (
						type?.map((type) => (
							<Link
								className="flex flex-col items-center justify-center gap-2 p-2 cursor-pointer border- aspect-square rounded-xl"
								key={`type-${type._id}`}
								href={`/accomodation?type=${type._id}`}
							>
								<Image
									src={`${type.icon}`}
									alt={`${type.name}`}
									width={100}
									height={100}
									className="1/2"
								/>
								<p className="font-bold text-md">{type.name}</p>
							</Link>
						))
					) : (
						Array.from({length: 8}).map((_, index) => (
							<Skeleton key={`list-type-skeleton-${index}`} className='aspect-square rounded-xl' />
						))
					)}
				</div>
			</CardBody>
		</Card>
	);
};

export default HomeTypeList;
