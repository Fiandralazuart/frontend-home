import { IAccomodationForm, IRegency } from "@/types/accomodation";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Autocomplete, AutocompleteItem, Input, Skeleton, Spinner } from "@heroui/react";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import useLocation from "./useLocation";
import { Button } from "@heroui/button";

interface PropTypes {
	dataAccomodation: IAccomodationForm;
	handleUpdate: (payload: IAccomodationForm) => void;
	isPendingUpdate: boolean;
	isSuccessUpdate: boolean;
	defaultInputRegion: string;
}

const LocationTab = (props: PropTypes) => {
	const { dataAccomodation, defaultInputRegion, handleUpdate, isPendingUpdate, isSuccessUpdate } =
		props;

	const {
		control,
		errors,
		reset,
		setValue,
		handleSubmit,

		searchRegency,
		setSearchRegency,
		dataRegion,
		handleSearchRegion,
	} = useLocation();

	useEffect(() => {
		if(dataAccomodation){
			setValue("address", `${dataAccomodation.location?.address}`)
			setValue("region", `${dataAccomodation.location?.region}`)
			setValue("link", `${dataAccomodation.location?.link}`)
		}
	}, [dataAccomodation])

	useEffect(() => {
		if (isSuccessUpdate) {
			reset();
		}
	}, [isSuccessUpdate]);

	return (
		<Card className="max-w-[500px] p-4">
			<CardHeader className="flex-col items-start">
				<h1 className="text-2xl font-bold">Room Location</h1>
				<p>Manage location of this room</p>
			</CardHeader>
			<CardBody>
				<form onSubmit={handleSubmit(handleUpdate)} className="flex flex-col gap-3">
					<Skeleton
						isLoaded={!!dataAccomodation.location?.address}
						className="rounded-lg"
					>
						<Controller
							name="address"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									label="Address"
									variant="bordered"
									isInvalid={errors.address !== undefined}
									errorMessage={errors.address?.message}
								/>
							)}
						/>
					</Skeleton>

					<Skeleton 
						isLoaded={!!dataAccomodation.location?.region}
						className="rounded-lg"
					>
						<Controller
							name="region"
							control={control}
							render={({ field: { onChange, ...field } }) => (
								<Autocomplete
									{...field}
									defaultItems={
										dataRegion?.data.data && searchRegency !== ''
											? dataRegion?.data.data
											: []
									}
									defaultInputValue={defaultInputRegion}
									label="City"
									variant="bordered"
									onInputChange={(search) => handleSearchRegion(search)}
									isInvalid={errors.region !== undefined}
									errorMessage={errors.region?.message}
									onSelectionChange={(value) => onChange(value)}
									placeholder="Search city here "
								>
									{(regency: IRegency) => (
										<AutocompleteItem key={`${regency.id}`}>
											{regency.name}
										</AutocompleteItem>
									)}
								</Autocomplete>
							)}
						/>
					</Skeleton>

					<Skeleton
						isLoaded={!!dataAccomodation.location?.link}
						className="rounded-lg"
					>
						<Controller
							name="link"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									label="Link"
									variant="bordered"
									isInvalid={errors.link !== undefined}
									errorMessage={errors.link?.message}
								/>
							)}
						/>
					</Skeleton>

					<Button disabled={isPendingUpdate} type="submit" className="text-white bg-default-700">
							{isPendingUpdate ? (
								<Spinner size="sm"/>
							): (
								"Save Changes"
							)}
					</Button>
				</form>
			</CardBody>
		</Card>
	);
};

export default LocationTab;
