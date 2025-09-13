import React, { Key, ReactNode, useCallback, useEffect } from "react";
import useBanner from "./useBanner";
import useChangeUrl from "@/components/hooks/useChangeUrl";
import { useRouter } from "next/router";
import Image from "next/image";
import { Chip, useDisclosure } from "@heroui/react";
import DropDownActions from "@/components/common/DropDownActions";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LIST_BANNER } from "./Banner.constant";
import DeleteBannerModal from "./DeleteBannerModal";
import AddBannerModal from "./AddBannerModal";

const Banner = () => {
	const { isReady, push, query } = useRouter();
	const {
		dataBanner,
		refetchBanner,
		isRefetchingBanner,
		isLoadingBanner,

		selectedId,
		setSelectedId,
	} = useBanner();

	const { setUrl } = useChangeUrl();
	const addBannerModal = useDisclosure();
	const deleteBannerModal = useDisclosure();

	useEffect(() => {
		if (isReady) setUrl();
	}, [isReady]);

	const renderCell = useCallback(
		(banner: Record<string, unknown>, columnKey: Key) => {
			const cellValue = banner[columnKey as keyof typeof banner];
			switch (columnKey) {
				case "banner":
					return (
						<Image
							src={`${cellValue}`}
							alt="banner"
							width={200}
							height={200}
							className="object-cover m-auto rounded-lg aspect-video w-36"
						/>
					);
				case "isShow":
					return (
						<Chip
							color={cellValue === true ? "success" : "warning"}
							size="sm"
							variant="flat"
						>
							{cellValue === true ? "Published" : "Not Published"}
						</Chip>
					);
				case "actions":
					return (
						<DropDownActions
							onPressButtonDetails={() => push(`/admin/banners/${banner._id}`)}
							onPressButtonDelete={() => {
								setSelectedId(`${banner._id}`);
								deleteBannerModal.onOpen();
							}}
						/>
					);
				default:
					return cellValue as ReactNode;
			}
		},
		[push]
	);

	return (
		<section>
			{Object.keys(query).length > 0 && (
				<DataTable
					data={dataBanner?.data || []}
					columns={COLUMN_LIST_BANNER}
					renderCell={renderCell}
					isLoading={isLoadingBanner}
					buttonTopContent="Add Banner"
					onClickbuttonTopContent={addBannerModal.onOpen}
					emptyContent="Reservation is Empty"
					totalPages={dataBanner?.pagination.totalPages}
					searchPlaceholder="Search Banner"
				/>
			)}

			<AddBannerModal {...addBannerModal} refetchBanner={refetchBanner} />

			<DeleteBannerModal
				{...deleteBannerModal}
				refetchBanner={refetchBanner}
				selectedId={selectedId}
				setSelectedId={setSelectedId}
			/>
		</section>
	);
};

export default Banner;
