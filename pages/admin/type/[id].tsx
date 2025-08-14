import DetailsType from "@/components/view/admin/DetailType"
import DashboardLayout from "@/layouts/dashboardLayout/DasboardLayout"

const AdminDetailTypePage = () => {

	return (
		<DashboardLayout title="Details Type" description="Manage Information for this Category" type="admin">
			<DetailsType />
		</DashboardLayout>
	)
}

export default AdminDetailTypePage