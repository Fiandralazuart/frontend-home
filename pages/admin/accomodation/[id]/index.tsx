import DetailAccomodation from "@/components/view/admin/DetailAccomodation"
import DashboardLayout from "@/layouts/dashboardLayout/DasboardLayout"

const AdminDetailAccomodationPage = () => {

	return (
		<DashboardLayout title="Details Accomodation" description="Manage Information for this Accomodation" type="admin">
			<DetailAccomodation />
		</DashboardLayout>
	)
}

export default AdminDetailAccomodationPage