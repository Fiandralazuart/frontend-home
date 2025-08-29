import { IAccomodation, IPhotos } from "@/types/accomodation";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import {
	Select,
	SelectItem,
	Skeleton,
	Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useInfoTab from "./useInfoTab";
import { Button } from "@heroui/button";
import { useEffect } from "react";

interface PropTypes {
	dataAccomodationPhotos: IPhotos;
	handleUpdate: (payload: IAccomodation) => void;
	isPendingUpdate: boolean;
	isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
	const { dataAccomodationPhotos, handleUpdate, isPendingUpdate, isSuccessUpdate } =
		props;

	const { control, errors, handleSubmit, setValue, reset } =
		useInfoTab();

	useEffect(() => {
		if (dataAccomodationPhotos) {
			setValue("name", `${dataAccomodationPhotos?.name}`);
			setValue("isPublish", `${dataAccomodationPhotos?.isPublish}`);
		}
	}, [dataAccomodationPhotos]);

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
					<Skeleton isLoaded={!!dataAccomodationPhotos.name} className="rounded-lg">
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
					
					<Skeleton
						isLoaded={!!dataAccomodationPhotos.name}
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
										dataAccomodationPhotos?.isPublish ? "true" : "false",
									]}
								>
									<SelectItem key="true">Publish</SelectItem>
									<SelectItem key="false">Draft</SelectItem>
								</Select>
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
