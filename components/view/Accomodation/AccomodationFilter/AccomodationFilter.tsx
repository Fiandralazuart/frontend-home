import { Fragment, useEffect } from "react";
import useAccomodationFilter from "./useAccomodationFilter";
import { Controller } from "react-hook-form";
import { Autocomplete, AutocompleteItem, Skeleton } from "@heroui/react";
import useChangeUrl from "@/components/hooks/useChangeUrl";
import { IRoomType } from "@/types/type";

const AccomodationFilter = () => {
	const { dataType, isSuccessGetType, control, setValue } =
		useAccomodationFilter();

	const { currentType, handleChangeType } = useChangeUrl();

	useEffect(() => {
		setValue("type", `${currentType}`);
	}, [isSuccessGetType]);

	return (
		<div className="p-4">
			<div className="w-full p-4 border h-fit rounded-xl lg:sticky lg:top-20 lg:w-80">
			<h1 className="mb-4 font-bold">Filter:</h1> 
				{isSuccessGetType ? (
					<Fragment>
						<Controller
							name="type"
							control={control}
							render={({ field: { onChange, ...field } }) => (
								<Autocomplete
									{...field}
									defaultItems={dataType?.data.data || []}
									label="Type"
									variant="bordered"
									labelPlacement="outside"
									defaultSelectedKey={`${currentType}`}
									onSelectionChange={(value) => {
										onChange(value);
										handleChangeType(value !== null ? `${value}` : "");
									}}
									placeholder="Search Type here "
								>
									{(type: IRoomType) => (
										<AutocompleteItem key={`${type._id}`}>
											{type.name}
										</AutocompleteItem>
									)}
								</Autocomplete>
							)}
						/>
					</Fragment>
				) : (
					<div className="space-y-6">
						<Skeleton className="w-full h-12 rounded-lg" />
					</div>
				)}
			</div>
		</div>
	);
};

export default AccomodationFilter;
