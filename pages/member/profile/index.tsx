import Profile from "@/components/view/member/ProfileTab"
import DashboardLayout from "@/layouts/dashboardLayout/DasboardLayout"

	const ProfileMemberPage = () => {
		return (
			<DashboardLayout title="Transaction" description="Manage your profile and security" type="member">
				<Profile />
			</DashboardLayout>
		)
		
	}
	
	export default ProfileMemberPage