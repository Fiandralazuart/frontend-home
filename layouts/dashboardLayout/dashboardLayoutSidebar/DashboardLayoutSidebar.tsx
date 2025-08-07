import Image from "next/image";
import { Listbox, ListboxItem } from "@heroui/listbox";
import Link from "next/link";
import { Button } from "@heroui/button";
import { CiLogout } from "react-icons/ci";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { cn } from "@/utils/cn";

interface sidebarItems {
	key: string;
	label: string;
	href: string;
	icon: JSX.Element;
}

interface PropTypes {
	sidebarItems: sidebarItems[];
	isOpen: boolean;
}

const DashboardLayoutSidebar = (props: PropTypes) => {
	const router = useRouter()
	const { sidebarItems, isOpen } = props;

	return (
		<div className={cn("fixed lg:relative z-60 -translate-x-full lg:translate-x-0 flex flex-col justify-between items-start min-h-screen p-8 min-w-[350px] shadow-md transition-all bg-white", {
			"translate-x-0": isOpen
		}) 
			}>
			<div className="flex flex-col w-full">
				<div>
					<Link href="/">
						<Image
							src="/images/general/logo.png"
							alt="logo"
							width={150}
							height={150}
						/>
					</Link>
				</div>
				<Listbox
					items={sidebarItems}
					variant="solid"
					aria-label="Dashboard Menu"
				>
					{(items) => (
						<ListboxItem
							key={items.key}
							startContent={items.icon}
							className={cn("mt-3 text-2xl font-bold text-black", {
								"bg-gray-200": router.pathname.startsWith(items.href)
							})}
							textValue={items.label}
							aria-labelledby={items.label}
							aria-describedby={items.label}
							as={Link}
							href={items.href}
						>
							<p>{items.label}</p>
						</ListboxItem>
					)}
				</Listbox>
			</div>
			<div className="">
				<Button
					className="font-semibold text-left text-black bg-white text-md"
					fullWidth
					size="lg"
					onPress={() =>
						signOut({
							callbackUrl: "/auth/login",
						})
					}
				>
					<CiLogout />
					Log Out
				</Button>
			</div>
		</div>
	);
};

export default DashboardLayoutSidebar;
