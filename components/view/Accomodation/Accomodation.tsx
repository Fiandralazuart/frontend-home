import React, { useEffect } from "react";
import AccomodationFilter from "./AccomodationFilter/AccomodationFilter";
import useAccomodation from "./useAccomodation";
import useChangeUrl from "@/components/hooks/useChangeUrl";
import { useRouter } from "next/router";
import CardAccomodation from "@/components/ui/CardAccomodation";
import { IAccomodation } from "@/types/accomodation";
import AccomodationFooter from "./AccomodationFooter";
import Image from "next/image";

const Accomodation = () => {
	const router = useRouter()

	const { setUrlExplore } = useChangeUrl()
	const {
		dataAccomodation,
		isLoadingGetAccomodation,
		isRefetchingAccomodation,
		refetchAccomodation,
	} = useAccomodation()

	useEffect(() => {
		if(router.isReady){
			setUrlExplore()
		}
	}, [router.isReady])

	return (
		<div className="flex flex-col justify-center w-full gap-6 px-4 lg:flex-row lg:px-0">
			<div className="w-full lg:w-80">
				<AccomodationFilter />
			</div>
			<div className="min-h-[70vh] w-full flex-1">
				<div className="grid grid-cols-1 mb-4 md:grid-cols-2 lg:grid-cols-3">
					{!isLoadingGetAccomodation && !isRefetchingAccomodation
						? dataAccomodation?.data?.map((accomodation: IAccomodation) => (
							<CardAccomodation accomodation={accomodation} key={`card-accomodation-${accomodation._id}`} />
							))
						: Array.from({ length: 3 }).map((_, index) => (
							<CardAccomodation key={`accomodation-loading-${index}`} isLoading={true} />
					))}
				</div>
				{!isLoadingGetAccomodation && dataAccomodation?.data?.length > 0 && (
					<AccomodationFooter totalPages={dataAccomodation?.pagination?.totalPages}/>
				)}

				{dataAccomodation?.data?.length < 1 && !isLoadingGetAccomodation && !isRefetchingAccomodation && (
					<div className='flex flex-col items-center justify-center gap-4 py-20'>
						<Image src="/images/ilustration/no-data.svg" alt="no-data" width={200} height={200} className='rounded-none'/>
						<h2 className='text-2xl font-bold text-center text-danger'>
							Accomodation is Empty
						</h2>
					</div>
				)}
			</div>
		</div>
	);
};

export default Accomodation;
