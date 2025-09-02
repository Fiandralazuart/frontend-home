import Banner from "@/components/view/admin/banner";
import DasboardLayout from "@/layouts/dashboardLayout";
import React from "react";

const AdminBannerPage = () => {
	return (
		<DasboardLayout
			title="Banner"
			description="Manage all display banner of this store"
			type="admin"
		>
			<Banner />
		</DasboardLayout>
	);
};

export default AdminBannerPage;
