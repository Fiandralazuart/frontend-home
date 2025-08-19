import { IAccomodation } from "@/types/accomodation";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import {
	Autocomplete,
	AutocompleteItem,
	Select,
	SelectItem,
	Skeleton,
	Spinner,
	Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useInfoTab from "./useInfoTab";
import { IRoomType } from "@/types/type";
import { FACILITIES_LIST } from "../../accomodation/addAccomodationModal/addAccomodation.constant";
import { Button } from "@heroui/button";
import { useEffect } from "react";

interface PropTypes {
	dataAccomodation: IAccomodation;
	handleUpdate: (payload: IAccomodation) => void;
	isPendingUpdate: boolean;
	isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
	const { dataAccomodation, handleUpdate, isPendingUpdate, isSuccessUpdate } =
		props;

	const { control, errors, handleSubmit, setValue, reset, dataType } =
		useInfoTab();

	useEffect(() => {
		if (dataAccomodation) {
			setValue("name", `${dataAccomodation?.name}`);
			setValue("type", `${dataAccomodation?.type}`);
			setValue("price", `${dataAccomodation?.price}`);
			setValue("facilities", dataAccomodation?.facilities ?? []);
			setValue("isPublish", `${dataAccomodation?.isPublish}`);
			setValue("description", `${dataAccomodation?.description}`);
		}
	}, [dataAccomodation]);

	useEffect(() => {
			if (isSuccessUpdate) {
				reset();
			}
		}, [isSuccessUpdate]);

	return (
		<Card className="max-w-[500px] p-4">
			<CardHeader className="flex-col items-start">
				<h1 className="text-2xl font-bold">Room Information</h1>
				<p>Manage all information about this room</p>
			</CardHeader>
			<CardBody>
				<p className="mb-2">Information</p>
				<form
					onSubmit={handleSubmit(handleUpdate)}
					className="flex flex-col gap-3 "
				>
					<Skeleton isLoaded={!!dataAccomodation.name} className="rounded-lg">
						<Controller
							name="name"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									label="Name"
									variant="bordered"
									isInvalid={errors.name !== undefined}
									errorMessage={errors.name?.message}
								/>
							)}
						/>
					</Skeleton>
					<Skeleton isLoaded={!!dataAccomodation.type} className="rounded-lg">
						<Controller
							name="type"
							control={control}
							render={({ field: { onChange, ...field } }) => (
								<Autocomplete
									{...field}
									label="Type"
									variant="bordered"
									isInvalid={errors.type !== undefined}
									errorMessage={errors.type?.message}
									defaultItems={dataType?.data.data ?? []}
									onSelectionChange={(value) => onChange(value)}
									defaultSelectedKey={dataAccomodation?.type}
								>
									{(type: IRoomType) => (
										<AutocompleteItem key={`${type._id}`}>
											{type.name}
										</AutocompleteItem>
									)}
								</Autocomplete>
							)}
						/>
					</Skeleton>
					<Skeleton isLoaded={!!dataAccomodation.price} className="rounded-lg">
						<Controller
							name="price"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									label="Price"
									variant="bordered"
									isInvalid={errors.price !== undefined}
									errorMessage={errors.price?.message}
								/>
							)}
						/>
					</Skeleton>
					<Skeleton
						isLoaded={!!dataAccomodation.facilities}
						className="rounded-lg"
					>
						<Controller
							name="facilities"
							control={control}
							render={({ field }) => (
								<Select
									items={FACILITIES_LIST}
									label="Facilities"
									variant="bordered"
									selectionMode="multiple"
									isInvalid={errors.facilities !== undefined}
									errorMessage={errors.facilities?.message}
									selectedKeys={new Set(field.value ?? [])} // ✅ Set<string>
									onSelectionChange={(keys) => {
										field.onChange(Array.from(keys) as string[]);
									}}
								>
									{FACILITIES_LIST.map((item) => (
										<SelectItem key={item.key}>{item.label}</SelectItem>
									))}
								</Select>
							)}
						/>
					</Skeleton>
					<Skeleton
						isLoaded={!!dataAccomodation.isPublish}
						className="rounded-lg"
					>
						<Controller
							name="isPublish"
							control={control}
							render={({ field }) => (
								<Select
									{...field}
									label="Status"
									variant="bordered"
									isInvalid={errors.isPublish !== undefined}
									errorMessage={errors.isPublish?.message}
									disallowEmptySelection
									defaultSelectedKeys={[
										dataAccomodation?.isPublish ? "true" : "false",
									]}
								>
									<SelectItem key="true">Publish</SelectItem>
									<SelectItem key="false">Draft</SelectItem>
								</Select>
							)}
						/>
					</Skeleton>
					<Skeleton
						isLoaded={!!dataAccomodation.description}
						className="rounded-lg"
					>
						<Controller
							name="description"
							control={control}
							render={({ field }) => (
								<Textarea
									{...field}
									label="Description"
									variant="bordered"
									isInvalid={errors.description !== undefined}
									errorMessage={errors.description?.message}
								/>
							)}
						/>
					</Skeleton>

					<Button disabled={isPendingUpdate} fullWidth className="text-white bg-default-700" type="submit">
						{isPendingUpdate ? <Spinner size="sm" /> : "Save Changes"}
					</Button>
				</form>
			</CardBody>
		</Card>
	);
};

export default InfoTab;
