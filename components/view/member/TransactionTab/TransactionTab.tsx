import React, { Key, ReactNode, useCallback } from "react";
import useTransactionTab from "./useTransactionTab";
import { Chip } from "@heroui/react";
import { convertIDR } from "@/utils/currency";
import DropDownActions from "@/components/common/DropDownActions";
import { useRouter } from "next/router";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LIST_TRANSACTION } from "./TransactionTab.constant";

const TransactionTab = () => {
	const { push, query, isReady } = useRouter();
	const {
		dataReservation,
		isLoadingDataReservation,
		isRefetchingDataReservation,
		refetchReservation,
	} = useTransactionTab();

	const renderCell = useCallback(
		(transaction: Record<string, unknown>, columnKey: Key) => {
			const cellValue = transaction[columnKey as keyof typeof transaction];
			switch (columnKey) {
				case "status":
					return (
						<Chip
							color={cellValue === "completed" ? "success" : "warning"}
							size="sm"
							variant="flat"
						>
							{cellValue as ReactNode}
						</Chip>
					);
				case "totalPrice":
					return convertIDR(Number(cellValue));

				case "checkIn": {
					if (
						typeof cellValue === "string" ||
						typeof cellValue === "number" ||
						cellValue instanceof Date
					) {
						const date = new Date(cellValue);
						const formatted = date.toLocaleDateString("id-ID", {
							day: "2-digit",
							month: "long",
							year: "numeric",
						});
						return formatted; // ✅ return string hasil format
					}
					return "-"; // fallback jika datanya bukan tanggal
				}
				case "checkOut": {
					if (
						typeof cellValue === "string" ||
						typeof cellValue === "number" ||
						cellValue instanceof Date
					) {
						const date = new Date(cellValue);
						const formatted = date.toLocaleDateString("id-ID", {
							day: "2-digit",
							month: "long",
							year: "numeric",
						});
						return formatted; // ✅ return string hasil format
					}
					return "-"; // fallback jika datanya bukan tanggal
				}
				case "actions":
					return (
						<DropDownActions
							onPressButtonDetails={() =>
								push(`/member/transaction/${transaction?.transactionId}`)
							}
							hideButtonDelete
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
			<DataTable
				columns={COLUMN_LIST_TRANSACTION}
				data={dataReservation?.data || []}
				emptyContent="Transaction is Empty"
				isLoading={isLoadingDataReservation || isRefetchingDataReservation}
				renderCell={renderCell}
				totalPages={dataReservation?.pagination.totalPages}
				displaySearch={false}
				displayAddButton={false}
			/>
		</section>
	);
};

export default TransactionTab;
