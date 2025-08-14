import InputFile from "@/components/ui/InputFIle";
import { IRoomType } from "@/types/type";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Skeleton, Spinner } from "@heroui/react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import useCoverTab from "./useCoverTab";
import { Button } from "@heroui/button";

interface PropTypes {
	currentIcon: string;
	onUpdate: (payload: IRoomType) => void;
	isPendingUpdate: boolean;
	isSuccessUpdate: boolean;
}

const CoverTab = (props: PropTypes) => {
	const { currentIcon, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

	const {
		control,
		errosUpdateIcon,
		handleSubmit,
		reset,

		handleDeleteIcon,
		handleUploadIcon,
		isPendingDeleteFile,
		isPendingUploadFile,
		preview,
	} = useCoverTab();

	return (
		<Card className="max-w-[500px] p-4">
			<CardHeader className="flex flex-col items-start">
				<h1 className="mb-2 text-2xl font-bold">Details Room Type</h1>
				<p>Manage Information For This Type Of Room</p>
			</CardHeader>
			<CardBody>
				<form onSubmit={handleSubmit(onUpdate)}>
					<div>
						<p>Current icon</p>
						<Skeleton
							isLoaded={!!currentIcon}
							className="rounded-lg aspect-square"
						>
							<Image src={currentIcon} alt="logo" fill className="!relative"/>
						</Skeleton>
					</div>
					<Controller
						name="icon"
						control={control}
						render={({ field: { onChange, value, ...field } }) => (
							<InputFile
								{...field}
								onUpload={(files) => handleUploadIcon(files, onChange)}
								onDelete={() => handleDeleteIcon(onChange)}
								isUploading={isPendingUploadFile}
								isDeleting={isPendingDeleteFile}
								isInvalid={errosUpdateIcon.icon !== undefined}
								errorMessage={errosUpdateIcon.icon?.message}
								isDropable
								label={
									<p className="mb-2 text-sm font-medium text-default-700">
										Upload New Icon
									</p>
								}
								preview={typeof preview === "string" ? preview : ""}
							/>
						)}
					/>
				<Button
					disabled={isPendingUploadFile || isPendingUpdate || !preview}
					type="submit"
					fullWidth
					className="mt-5 text-white bg-default-700"
				>
					{isPendingUpdate ? (
						<Spinner size="sm" color="white" />
					) : (
						"Save Changes"
					)}
				</Button>
				</form>
			</CardBody>
		</Card>
	);
};

export default CoverTab;
