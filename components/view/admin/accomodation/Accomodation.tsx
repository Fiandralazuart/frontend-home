import { useRouter } from "next/router";
import COLUMN_LIST_ACCOMODATION from "./Accomodation.constant";
import DataTable from "@/components/ui/DataTable";
import useAccomodation from "./useAccomodation";
import Image from "next/image";
import { Key, ReactNode, useCallback, useEffect, useState } from "react";
import { Chip, useDisclosure } from "@heroui/react";
import DropDownActions from "@/components/common/DropDownActions";
import useChangeUrl from "@/components/hooks/useChangeUrl";
import { Button } from "@heroui/button";
import TypeChip from "@/components/common/TypeChip";
import { convertIDR } from "@/utils/currency";
import AddAccomodationModal from "./addAccomodationModal";
import DeleteAccomodationModal from "./deleteAccomodationModal";

const Accomodation = () => {
	const { query, push, isReady } = useRouter();
	const {
		dataAccomodation,
		isLoadingGetAccomodation,
		isRefetchingAccomodation,
		refetchAccomodation,

		selectedId,
		setSelectedId,
	} = useAccomodation();

	const addAccomodationModal = useDisclosure();
	const deleteAccomodationModal = useDisclosure();

	const { setUrl } = useChangeUrl();

	useEffect(() => {
		if (isReady) setUrl();
	}, [isReady]);

	const renderCell = useCallback(
		(accomodation: Record<string, unknown>, columnKey: Key) => {
			const cellValue = accomodation[columnKey as keyof typeof accomodation];
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
				case "type":
					return <TypeChip cellValue={`${cellValue}`} />;
				case "price":
					return `${convertIDR(cellValue as number)} / Hari`;
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
								push(`/admin/accomodation/${accomodation._id}`)
							}
							onPressButtonDelete={() => {
								setSelectedId(`${accomodation._id}`);
								deleteAccomodationModal.onOpen();
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
					data={dataAccomodation?.data || []}
					columns={COLUMN_LIST_ACCOMODATION}
					renderCell={renderCell}
					isLoading={isLoadingGetAccomodation}
					buttonTopContent="Add Accomodation"
					onClickbuttonTopContent={addAccomodationModal.onOpen}
					emptyContent="Accomodation is Empty"
					totalPages={dataAccomodation?.pagination.totalPages}
					searchPlaceholder="Search Accomodation"
				/>
			)}

			<AddAccomodationModal
				{...addAccomodationModal}
				refetchAccomodation={refetchAccomodation}
			/>
			<DeleteAccomodationModal
				{...deleteAccomodationModal}
				refetchAccomodation={refetchAccomodation}
				selectedId={selectedId}
				setSelectedId={setSelectedId}
			/>
		</section>
	);
};

export default Accomodation;
