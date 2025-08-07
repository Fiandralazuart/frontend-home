import RoomType from "@/components/view/admin/type";
import DashboardLayout from "@/layouts/dashboardLayout";

const TypePage = () => {
	return (
		<DashboardLayout
			description="List of all room types, Add new type and manage existing type of room"
			type="admin"
			title="Room Type"
		>
			<RoomType />
		</DashboardLayout>
	);
};

export default TypePage