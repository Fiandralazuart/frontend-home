import React, { Key, ReactNode, useCallback } from "react";
import usePhotosTab from "./usePhotosTab";
import Image from "next/image";
import { Chip, useDisclosure } from "@heroui/react";
import DropDownActions from "@/components/common/DropDownActions";
import { useRouter } from "next/router";
import DataTable from "@/components/ui/DataTable";
import LIST_PHOTOS_COLUMN from "./PhotosTab.constant";
import AddPhotosModal from "./AddPhotosModal";
import DeletePhotosModal from "./DeletePhotosModal";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

const PhotosTab = () => {
	const { push, query } = useRouter();
	const {
		dataPhotos,
		refetchPhotos,
		isRefetchingPhotos,
		isLoadingPhotos,
		selectedId,
		setSelectedId,
	} = usePhotosTab();

	const addPhotosModal = useDisclosure();
	const deletePhotosModal = useDisclosure();


	const renderCell = useCallback(
		(photos: Record<string, unknown>, columnKey: Key) => {
			const cellValue = photos[columnKey as keyof typeof photos];
			switch (columnKey) {
				case "image":
					return (
						<Image
							className="object-cover m-auto rounded-lg aspect-video w-36"
							src={`${cellValue}`}
							alt="icon"
							width={200}
							height={100}
						/>
					);
				case "isPublish":
					return (
						<Chip
							color={cellValue === true ? "success" : "danger"}
							size="sm"
							variant="flat"
						>
							{cellValue === true ? "Published" : "Not Published"}
						</Chip>
					);
				case "actions":
					return (
						<DropDownActions
							onPressButtonDetails={() =>
								push(`/admin/accomodation/${query.id}/photos/${photos._id}	`)
							}
							onPressButtonDelete={() => {
								setSelectedId(`${photos._id}`);
								deletePhotosModal.onOpen();
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
			{Object.keys(query).length > 0 && !isLoadingPhotos && (
				<DataTable
					key={dataPhotos?.pagination?.total}
					data={dataPhotos?.data || []}
					columns={LIST_PHOTOS_COLUMN}
					renderCell={renderCell}
					isLoading={isLoadingPhotos}
					buttonTopContent="Add Photos"
					onClickbuttonTopContent={addPhotosModal.onOpen}
					emptyContent="Photos is Empty"
					searchPlaceholder="Search Photos"
					displaySearch={false}
					displayBottom={false}
					buttonCondition={true}
				/>
			)}
			<AddPhotosModal {...addPhotosModal} refetchPhotos={refetchPhotos} />
			<DeletePhotosModal
				{...deletePhotosModal}
				selectedId={selectedId}
				setSelectedId={setSelectedId}
				refetchPhotos={refetchPhotos}
			/>
		</section>
	);
};

export default PhotosTab;
