import TransactionTab from "@/components/view/member/TransactionTab"
import DashboardLayout from "@/layouts/dashboardLayout/DasboardLayout"

	const TransactionMemberPage = () => {
		return (
			<DashboardLayout title="Reservation" description="List of all reservation" type="member">
				<TransactionTab />
			</DashboardLayout>
		)
		
	}
	
	export default TransactionMemberPage