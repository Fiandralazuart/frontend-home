import { IAccomodation } from '@/types/accomodation';
import { cn } from '@/utils/cn';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Skeleton } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

interface PropTypes {
	accomodation?: IAccomodation;
	className?: string;
	isLoading?: boolean;
	key?: string;
}

const CardAccomodation = (props: PropTypes) => {
	const { accomodation, className, key, isLoading } = props;
	return (
		<Card
			shadow="sm"
			isPressable
			as={Link}
			href={`/accomodation/${accomodation?.slug}`}
			key={key}
			className={cn(className, 'cursor-pointer w-auto')}
		>
			{!isLoading ? (
				<Fragment>
					<CardBody>
						<Image
							alt="cover"
							src={`${accomodation?.image}`}
							width={300}
							height={200}
							className="object-cover w-full rounded-lg"
						/>
					</CardBody>
					<CardFooter className="flex-col items-start pt-0 text-left">
						<h2 className="text-sm font-bold text-black line-clamp-1">
							{accomodation?.name}
						</h2>
						<p className="mb-2 max-w-[250px] text-sm text-[#4F7396] line-clamp-2 ">{accomodation?.description}</p>
					</CardFooter>
				</Fragment>
			) : (
				<Fragment>
					<CardFooter>
						<Skeleton className='w-full rounded-lg aspect-video bg-default-300' />
					</CardFooter>
					<CardFooter className='flex flex-col items-start gap-2'>
						<Skeleton className='w-3/5 h-4 rounded-lg bg-default-200' />
						<Skeleton className='w-4/5 h-4 rounded-lg bg-default-200' />
						<Skeleton className='w-2/5 h-4 rounded-lg bg-default-200' />
					</CardFooter>
				</Fragment>
			)}
		</Card>
	);
};

export default CardAccomodation;
