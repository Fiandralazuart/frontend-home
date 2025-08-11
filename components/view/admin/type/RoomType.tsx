import React, { Key, ReactNode, useCallback, useEffect } from "react";
import useRoomType from "./useRoomType";
import Image from "next/image";
import DropDownActions from "@/components/common/DropDownActions";
import { useRouter } from "next/router";
import DataTable from "@/components/ui/DataTable";
import COLUMNS_LIST_TYPE from "./RoomType.constant";
import useChangeUrl from "@/components/hooks/useChangeUrl";
import { useDisclosure } from "@heroui/react";
import AddTypeModal from "./addTypeModal";
import DeleteTypeModal from "./deleteTypeModal";

const RoomType = () => {
	const { push, isReady, query } = useRouter();
	const {
		dataRoomType,
		isLoadingType,
		isRefetchingType,
		refetchType,
		selectedId,
		setSelectedId,
	} = useRoomType();

	const addTypeModal = useDisclosure();
	const deleteTypeModal = useDisclosure();
	const { setUrl } = useChangeUrl();

	useEffect(() => {
		if (isReady) setUrl();
	}, [isReady]);

	// useCallback digunakan agar table tidak selalu merender ulang jika nilainya sama dan hanya re render jika ada perubahan melalui push/route
	const renderCell = useCallback(
		(type: Record<string, unknown>, columnKey: Key) => {
			const cellValue = type[columnKey as keyof typeof type];

			switch (columnKey) {
				// case "icon":
				// 	return (
				// 		<Image src={`${cellValue}`} alt="icon" width={100} height={200} />
				// 	);
				case "actions":
					return (
						<DropDownActions
							onPressButtonDetails={() => push(`/admin/type/${type._id}`)}
							onPressButtonDelete={() => {
								setSelectedId(`${type._id}`);
								deleteTypeModal.onOpen();
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
					data={dataRoomType?.data || []}
					columns={COLUMNS_LIST_TYPE}
					renderCell={renderCell}
					isLoading={isLoadingType}
					buttonTopContent="Add Room Type"
					emptyContent="Room Type is empty"
					totalPages={dataRoomType?.pagination.totalPages}
					onClickbuttonTopContent={addTypeModal.onOpen}
				/>
			)}
			<AddTypeModal {...addTypeModal} refetchType={refetchType} />
			<DeleteTypeModal
				{...deleteTypeModal}
				refetchType={refetchType}
				selectedId={selectedId}
				setSelectedId={setSelectedId}
			/>
		</section>
	);
};

export default RoomType;
