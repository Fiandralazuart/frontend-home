import { IRoomType } from "@/types/type";
import React, { useEffect } from "react";
import useInfoTab from "./useInfoTab";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Controller } from "react-hook-form";
import { Input } from "@heroui/input";
import { Skeleton, Spinner } from "@heroui/react";
import { Button } from "@heroui/button";


interface PropTypes {
	dataType: IRoomType;
	onUpdate: (payload: IRoomType) => void;
	isPendingUpdate: boolean;
	isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
	const { dataType, onUpdate, isPendingUpdate, isSuccessUpdate } = props
	const {
		control, 
		handleSubmit,
		setValue,
		reset,
		errors,
	} = useInfoTab()

	useEffect(() => {
		setValue("name", `${dataType?.name}`)
	}, [dataType])

	useEffect(() => {
		if(isSuccessUpdate){
			reset()
		}
	}, [isSuccessUpdate])
	return (
		<Card className="flex flex-col max-w-[500px] p-4">
			<CardHeader className="flex flex-col items-start">
				<h1 className="mb-2 text-2xl font-bold">Details Room Type</h1>
				<p>Manage Information For This Type Of Room</p>
			</CardHeader>
			<CardBody>
				<form onSubmit={handleSubmit(onUpdate)}>
					<Skeleton isLoaded={!!dataType?.name}>
						<Controller 
							name="name"
							control={control}
							render={({field}) => (
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
					<div className="w-full mt-4">
					<Button type="submit" fullWidth className="text-white bg-default-700">
						{isPendingUpdate ? (
							<Spinner size="sm"/>
						) : (
							"Save Changes"
						)}
					</Button>
				</div>
				</form>
			</CardBody>
		</Card>
	);
};

export default InfoTab;
