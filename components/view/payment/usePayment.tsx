import reservationServices from '@/services/reservation.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const usePayment = () => {
	const router = useRouter();
	const { order_id, status } = router.query;

	const standarizeStatus = (status: string) => {
		switch (status) {
			case 'success':
				return 'completed';
			case 'progress':
				return 'pending';
			case 'failed':
				return 'cancelled';
			default:
				return status;
		}
	};

	const updateOrderStatus = async () => {
		const result = await reservationServices.updateTransactionStatus(
			`${order_id}`,
			`${status}`,
		);
	};

	const { mutate: mutateUpdateTransactionStatus } = useMutation({
		mutationFn: updateOrderStatus,
	});

	return {
		mutateUpdateTransactionStatus
	}
};

export default usePayment
