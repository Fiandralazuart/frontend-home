import React, { Key, ReactNode, useEffect, useMemo } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import { Input } from "@heroui/input";
import { CiSearch } from "react-icons/ci";
import { Button } from "@heroui/button";
import { cn } from "@/utils/cn";
import useChangeUrl from "@/components/hooks/useChangeUrl";
import { Select, SelectItem } from "@heroui/select";
import { Pagination } from "@heroui/pagination";
import { LIST_LIMIT } from "@/constant/list.constant";

interface PropTypes {
	data: Record<string, unknown>[];
	columns: Record<string, unknown>[];
	renderCell: (type: Record<string, unknown>, columnKey: Key) => ReactNode;
	isLoading: boolean;
	buttonTopContent: string;
	onClickbuttonTopContent?: () => void;
	emptyContent: string;
	totalPages: number;
}

const DataTable = (props: PropTypes) => {
	const {
		data,
		columns,
		renderCell,
		isLoading,
		buttonTopContent,
		onClickbuttonTopContent,
		emptyContent,
		totalPages,
	} = props;

	const {
		handleSearch,
		handleClearSearch,
		handleChangeLimit,
		handleChangePage,
		currentLimit,
		currentPage,
	} = useChangeUrl();

	const TopContent = useMemo(() => {
		return (
			<div className="flex flex-col gap-2 lg:justify-between lg:flex-row">
				<Input
					variant="bordered"
					className="max-w-[55%] lg:max-w-[40%]"
					classNames={{
						inputWrapper: "border-gray-300",
					}}
					isClearable
					placeholder="Search Type"
					startContent={<CiSearch />}
					onChange={handleSearch}
					onClear={handleClearSearch}
				/>

				<Button className="max-w-[150px] bg-default-700 text-white">
					{buttonTopContent}
				</Button>
			</div>
		);
	}, [buttonTopContent]);

	const BottomContent = useMemo(() => {
		return (
			<div className="flex items-center justify-center lg:justify-between">
				<Select
					className="hidden max-w-36 lg:block"
					size="md"
					selectedKeys={[`${currentLimit}`]}
					startContent={<p>Show:</p>}
					selectionMode="single"
					disallowEmptySelection
					onChange={handleChangeLimit}
				>
					{LIST_LIMIT.map((items) => (
						<SelectItem key={items.value}>{items.label}</SelectItem>
					))}
				</Select>

				<Pagination
					classNames={{
						cursor: "bg-default-500 text-white",
					}}
					page={Number(currentPage)}
					total={totalPages}
					loop
					showControls
					onChange={handleChangePage}
				/>
			</div>
		);
	}, [currentLimit, currentPage, totalPages, handleChangeLimit]);

	return (
		<Table
			className="text-black"
			topContent={TopContent}
			topContentPlacement="outside"
			bottomContent={BottomContent}
			classNames={{
				base: "max-w-full",
				wrapper: cn({ "overflow-x-hidden": isLoading }),
			}}
		>
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn key={column.uid as Key}>
						{column.name as string}
					</TableColumn>
				)}
			</TableHeader>

			<TableBody
				items={data}
				emptyContent={emptyContent}
				isLoading={isLoading}
				loadingContent={
					<div className="z-10 flex items-center justify-center w-full h-full backdrop-blur-sm bg-foreground-600/30">
						<Spinner color="current" />
					</div>
				}
			>
				{(item) => (
					<TableRow key={item._id as Key}>
						{(columnKey) => (
							<TableCell>{renderCell(item, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export default DataTable;
