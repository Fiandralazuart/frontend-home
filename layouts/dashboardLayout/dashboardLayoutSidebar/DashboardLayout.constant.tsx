import { CiBookmark, CiCalendarDate, CiSettings, CiShoppingTag } from "react-icons/ci";
import { PiBed } from "react-icons/pi";

const adminSidebar = [
	{
		key: "reservation",
		label: "Reservation",
		href: "/admin/reservation",
		icon: <CiCalendarDate />,
	},
	{
		key: "accomodation",
		label: "Accomodation",
		href: "/admin/accomodation",
		icon: <PiBed />,
	},
	{
		key: "type",
		label: "Room Type",
		href: "/admin/type",
		icon: <CiShoppingTag />,
	},
	{
		key: "banners",
		label: "Banners",
		href: "/admin/banners",
		icon: <CiBookmark />,
	},
];

const memberSidebar = [
	{
		key: "reservation",
		label: "Reservation",
		href: "/admin/reservation",
		icon: <CiCalendarDate />,
	},
	{
		key: "profile",
		label: "Profile",
		href: "/adminprofile",
		icon: <CiSettings/>,
	},
];

export { adminSidebar, memberSidebar };
