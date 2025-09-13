import { ToasterContext } from '@/context/ToasterContex';
import bannerSevices from '@/services/banner.service';
import { IBanner } from '@/types/banner';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useContext } from 'react';



const useDetailBanner = () => {
	const { query, isReady } = useRouter();
	const { setToaster } = useContext(ToasterContext);
	

	const getBannerById = async () => {
		const { data } = await bannerSevices.findById(`${query.id}`);
		return data.data;
	};

	const { data: dataBanner, refetch: refetchBanner } = useQuery({
		queryKey: ['Banner'],
		queryFn: getBannerById,
		enabled: isReady,
	});


	const updateBanner = async (payload: IBanner) => {
		const { data } = await bannerSevices.update(
			`${query.id}`,
			payload,
		);
		return data.data;
	};

	const {
		mutate: mutateUpdateBanner,
		isPending: isPendingMutateUpdateBanner,
		isSuccess: isSuccessMutateUpdateBanner,
	} = useMutation({
		mutationFn: (payload: IBanner) => updateBanner(payload),
		onError: (error) => {
			setToaster({
				type: 'error',
				message: error.message,
			});
		},
		onSuccess: () => {
			refetchBanner();

			setToaster({
				type: 'success',
				message: 'Success update Banner',
			});
		},
	});

   const handleUpdateBanner = (data: IBanner) => mutateUpdateBanner(data)



	return {
		dataBanner,
      handleUpdateBanner,
      isPendingMutateUpdateBanner,
      isSuccessMutateUpdateBanner,

	};
};

export default useDetailBanner;
