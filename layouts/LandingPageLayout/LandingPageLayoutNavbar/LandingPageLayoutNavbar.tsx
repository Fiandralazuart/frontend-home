import React, { Fragment } from "react";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";
import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Listbox,
	ListboxItem,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	Spinner,
} from "@heroui/react";
import Image from "next/image";
import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constant";
import { useRouter } from "next/router";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { IAccomodation } from "@/types/accomodation";
import { signOut, useSession } from "next-auth/react";
import { Button, ButtonProps } from "@heroui/button";

const LandingPageLayoutNavbar = () => {
	const router = useRouter();
	const session = useSession();
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const {
		dataProfile,
		RefetchDataProfile,
		dataAccomodationSearch,
		RefetchDataAccomodationSearch,
		isRefetchingAccomodationSearch,
		isLoadingAccomodationSearch,
		handleSearch,
		search,
		setSearch,
	} = useLandingPageLayoutNavbar();

	return (
		<Navbar
			maxWidth="full"
			isBordered
			isBlurred={false}
			shouldHideOnScroll
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
		>
			<div className="flex items-center w-full gap-8 ">
				<NavbarBrand as={Link} href={"/"}>
					<Image
						src="/images/general/logono.png"
						alt="logo"
						width={120}
						height={70}
						className="cursor-pointer"
					/>
				</NavbarBrand>
				<NavbarContent justify="end" className="hidden pr-5 lg:flex lg:gap-10">
					{NAV_ITEMS.map((items) => (
						<NavbarItem
							key={`nav-${items.label}`}
							as="button"
							type="button"
							onClick={(e) => {
								if (items.scroll) {
									e.preventDefault();
									const el = document.getElementById(items.scroll);
									if (el) {
										setTimeout(() => {
											const y =
												el.getBoundingClientRect().top + window.scrollY - 90;
											window.scrollTo({ top: y, behavior: "smooth" });
										}, 200); // kasih delay 200ms
									}
								} else if (items.href) {
									router.push(items.href);
								}
							}}
							// key={`nav-${items.label}`}
							// onClick={(e) => {
							// 	if (items.scroll) {
							// 		e.preventDefault(); // cegah reload
							// 		const el = document.getElementById(items.scroll);
							// 		if (el) {
							// 			el.scrollIntoView({ behavior: "smooth" });
							// 		}
							// 	} else if (items.href) {
							// 		router.push(items.href);
							// 	}
							// }}
							className={cn(
								"font-medium text-lg text-default-700 hover:text-blue-500 cursor-pointer",
								{
									"font-bold text-blue-500": router.pathname === items.href,
								}
							)}
						>
							{items.label}
						</NavbarItem>
					))}
				</NavbarContent>
			</div>

			<NavbarContent justify="end">
				<NavbarMenuToggle className="lg:hidden" />

				<NavbarItem className="hidden lg:relative lg:flex">
					<Input
						isClearable
						className="w-[300px]"
						placeholder="Search Accomodation"
						startContent={<CiSearch />}
						onClear={() => setSearch("")}
						onChange={handleSearch}
					/>
					{search !== "" && (
						<Listbox
							items={dataAccomodationSearch?.data || []}
							className="absolute right-0 bg-white border top-12 rounded-xl"
						>
							{!isRefetchingAccomodationSearch &&
							!isLoadingAccomodationSearch ? (
								(items: IAccomodation) => (
									<ListboxItem
										key={items._id}
										href={`/accomodation/${items.slug}`}
									>
										<div className="flex items-center gap-2">
											<Image
												src={`${items.image}`}
												alt={`${items.name}`}
												className="w-2/5 rounded-md"
												width={100}
												height={40}
											/>
											<p className="w-3/5 line-clamp-2 text-wrap">
												{items.name}
											</p>
										</div>
									</ListboxItem>
								)
							) : (
								<ListboxItem key={"loading"}>
									<Spinner color="white" size="sm" />
								</ListboxItem>
							)}
						</Listbox>
					)}
				</NavbarItem>

				{session.status === "authenticated" ? (
					<NavbarItem className="hidden lg:flex">
						<Dropdown>
							<DropdownTrigger>
								<Avatar
									src={dataProfile?.profilePicture}
									className="cursor-pointer"
									showFallback
								/>
							</DropdownTrigger>
							<DropdownMenu>
								<DropdownItem
									key="admin"
									href="/admin/accomodation"
									className={cn({
										hidden: dataProfile?.role !== "admin",
									})}
								>
									Admin
								</DropdownItem>
								<DropdownItem key="profile" href="/member/profile">
									Profile
								</DropdownItem>
								<DropdownItem key="signout" onPress={() => signOut()}>
									Log Out
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</NavbarItem>
				) : (
					<div className="hidden lg:flex lg:gap-4">
						{BUTTON_ITEMS.map((items) => (
							<NavbarItem key={`button-${items.label}`}>
								<Link href={items.href}>
									<Button
										variant={items.variant as ButtonProps["variant"]}
										className="text-white bg-default-700"
									>
										{items.label}
									</Button>
								</Link>
							</NavbarItem>
						))}
					</div>
				)}

				<NavbarMenu className="gap-4">
					{NAV_ITEMS.map((items) => (
						<NavbarMenuItem
							key={`nav-${items.label}`}
							onClick={(e) => {
								e.preventDefault();
								setIsMenuOpen(false); // tutup menu

								if (items.scroll) {
									const el = document.getElementById(items.scroll);
									if (el) {
										setTimeout(() => {
											const y =
												el.getBoundingClientRect().top + window.scrollY - 90;
											window.scrollTo({ top: y, behavior: "smooth" });
										}, 300); // kasih delay biar animasi close selesai
									}
								} else if (items.href) {
									router.push(items.href);
								}
							}}
						>
							<span
								className={cn(
									"font-medium text-default-700 hover:text-blue-500",
									{
										"font-bold text-blue-500": router.pathname === items.href,
									}
								)}
							>
								{items.label}
							</span>
						</NavbarMenuItem>
					))}
					{session.status === "authenticated" ? (
						<Fragment>
							<NavbarMenuItem
								className={cn({
									hidden: dataProfile?.role !== "admin",
								})}
							>
								<Link
									href="/admin/accomodation"
									className="font-medium text-default-700 hover:text-blue-500"
								>
									Admin
								</Link>
							</NavbarMenuItem>
							<NavbarMenuItem className="font-medium">
								<Link
									href="/member/profile"
									className="font-medium text-default-700 hover:text-blue-500"
								>
									Profile
								</Link>
							</NavbarMenuItem>
							<NavbarMenuItem>
								<Button
									onPress={() => signOut()}
									className="w-full mt-2 text-white bg-default-700"
									variant="bordered"
									size="md"
								>
									Sign Out
								</Button>
							</NavbarMenuItem>
						</Fragment>
					) : (
						<Fragment>
							{BUTTON_ITEMS.map((items) => (
								<NavbarMenuItem key={`button-${items.label}`}>
									<Button
										className="text-white bg-default-700"
										fullWidth
										as={Link}
										href={items.href}
										variant={items.variant as ButtonProps["variant"]}
										size="md"
									>
										{items.label}
									</Button>
								</NavbarMenuItem>
							))}
						</Fragment>
					)}
				</NavbarMenu>
			</NavbarContent>
		</Navbar>
	);
};

export default LandingPageLayoutNavbar;
