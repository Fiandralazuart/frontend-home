import DetailBanner from "@/components/view/admin/DetailBanner";
import DashboardLayout from "@/layouts/dashboardLayout/DasboardLayout";
import React from "react";

const AdminDetailPage = () => {
	return (
		<DashboardLayout
			title="Detail Banner"
			description="Manage Information for this Banner"
			type="admin"
		>
			<DetailBanner />
		</DashboardLayout>
	);
};

export default AdminDetailPage;
