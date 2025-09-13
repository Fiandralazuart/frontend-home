import useChangeUrl from "@/components/hooks/useChangeUrl";
import { LIST_LIMIT } from "@/constant/list.constant";
import { Pagination } from "@heroui/pagination";
import { Select, SelectItem } from "@heroui/select";

interface PropTypes {
	totalPages: number;
}

const AccomodationFooter = (props: PropTypes) => {
	const { totalPages } = props;
	const { currentLimit, handleChangeLimit, currentPage, handleChangePage } = useChangeUrl();
	return (
		<div className="flex flex-col items-center justify-center gap-4 py-2 lg:flex-row lg:justify-between">
				<Select
					className="max-w-28"
					size="md"
					selectedKeys={[`${currentLimit}`]}
					selectionMode="single"
					onChange={handleChangeLimit}
					startContent={<p className="text-sm">Show: </p>}
					disallowEmptySelection
				>
					{LIST_LIMIT.map((item) => (
						<SelectItem key={item.value}>
							{item.label}
						</SelectItem>
					))}
				</Select>
			{totalPages > 1 && (
				<Pagination
					isCompact
					showControls
					color="danger"
					page={Number(currentPage)}
					total={totalPages}
					onChange={handleChangePage}
					loop
				/>
			)}
		</div>
	);
};

export default AccomodationFooter;
