import Accomodation from "@/components/view/admin/accomodation";
import DashboardLayout from "@/layouts/dashboardLayout/DasboardLayout";

const AccomodationPage = () => {
	return (
		<DashboardLayout
			description="List of all Accomodation, Add new Accomodation and manage existing Accomodation"
			type="admin"
			title="Accomodation"
		>
			<Accomodation />
		</DashboardLayout>
	);
};

export default AccomodationPage;
