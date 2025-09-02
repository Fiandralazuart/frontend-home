import Reservation from "@/components/view/admin/reservation";
import DashboardLayout from "@/layouts/dashboardLayout/DasboardLayout";
import React from "react";

const AdminReservationPage = () => {
	return (
		<DashboardLayout
			title="Reservation"
			type="admin"
			description="Access all information about customer reservation"
		>
			<Reservation />
		</DashboardLayout>
	);
};

export default AdminReservationPage;
