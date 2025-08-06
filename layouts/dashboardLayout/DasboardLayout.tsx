import PageHead from "@/components/common/PageHead";
import React, { ReactNode, useState } from "react";
import DashboardLayoutSidebar from "./dashboardLayoutSidebar";
import { adminSidebar, memberSidebar } from "./dashboardLayoutSidebar/DashboardLayout.constant";
import { Navbar, NavbarMenuToggle } from "@heroui/navbar";

interface PropTypes {
	title?: string;
	description: string;
	type?: string;
	children: ReactNode;
}

const DashboardLayout = (props: PropTypes) => {
	const { title, description, type = "admin", children } = props;
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<PageHead title={title} />
			<div className="flex text-default">
				<DashboardLayoutSidebar sidebarItems={type === "admin" ? adminSidebar : memberSidebar} isOpen={isOpen} />
				<div className="w-full min-h-screen p-8 bg-default-700">
					<Navbar className="flex justify-between bg-transparent" classNames={{wrapper: "p-0"}} isBlurred={false} position="static">
						<h1 className="text-2xl font-bold">{title}</h1>
						<NavbarMenuToggle 
							aria-label={isOpen ? "Close Menu" : "Open Menu"}
							onClick={() => setIsOpen(!isOpen) }
							className="lg:hidden"
						/>

					</Navbar>
					<h2 className="text-lg">{description}</h2>
					{children}
				</div>
			</div>
		</>
	);
};

export default DashboardLayout;
