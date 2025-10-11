import DetailTransaction from "@/components/view/admin/reservation/DetailTransaction"
import DashboardLayout from "@/layouts/dashboardLayout/DasboardLayout"

	const TransactionMemberPage = () => {
		return (
			<DashboardLayout title="Detail Transaction" description="View your transaction details, including payment information and order status." type="member">
				<DetailTransaction />
			</DashboardLayout>
		)
		
	}
	
	export default TransactionMemberPage