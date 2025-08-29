import DetailPhotos from "@/components/view/admin/DetailPhotos";
import DashboardLayout from "@/layouts/dashboardLayout/DasboardLayout";
import React from "react";

const AdminDetailAccomodationPhotos = () => {
	return (
		<DashboardLayout title="Details Photos" description="Manage photos of this accomodation" type="admin">
			<DetailPhotos />
		</DashboardLayout>
	);
};

export default AdminDetailAccomodationPhotos;
