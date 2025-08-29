import InputFile from "@/components/ui/InputFIle";
import { IAccomodation } from "@/types/accomodation";
import { Card, CardBody, CardHeader, Skeleton, Spinner } from "@heroui/react";
import Image from "next/image";
import React, { useEffect } from "react";
import usePhotosTab from "./usePhotosTab";
import { Controller } from "react-hook-form";
import { Button } from "@heroui/button";

interface PropTypes {
	currentImage: string;
	handleUpdate: (payload: IAccomodation) => void;
	isPendingUpdateAccomodation: boolean;
	isSuccessUpdateAccomodation: boolean;
}

const PhotosTab = (props: PropTypes) => {
	const {
		currentImage,
		handleUpdate,
		isPendingUpdateAccomodation,
		isSuccessUpdateAccomodation,
	} = props;

	const {
		control,
		handleSubmit,
		reset,
		errosUpdateImage,

		handleDeleteImage,
		handleUploadImage,
		isPendingDeleteFile,
		isPendingUploadFile,
		preview,
	} = usePhotosTab();

	useEffect(() => {
			if (isSuccessUpdateAccomodation) {
				reset();
			}
		}, [isSuccessUpdateAccomodation]);

	return (
		<Card className="max-w-[500px] p-4">
				<CardHeader className="flex flex-col items-start">
					<h1 className="text-2xl font-bold">Accomodation Photos</h1>
					<p>Manage Photos of this room</p>
				</CardHeader>
				<CardBody>
					<form onSubmit={handleSubmit(handleUpdate)}>
						<div>
							<Skeleton
								isLoaded={!!currentImage}
								className="rounded-lg aspect-video"
							>
								<Image src={currentImage} alt="image" fill className="!relative rounded-lg"/>
							</Skeleton>
						</div>
						<div className="mt-2">
							<p className="mb-2">Upload new photos</p>
							<Controller
								name="image"
								control={control}
								render={({ field: { onChange, value, ...field } }) => (
									<InputFile
										{...field}
										onDelete={() => handleDeleteImage(onChange)}
										onUpload={(files) => handleUploadImage(files, onChange)}
										isUploading={isPendingUploadFile}
										isDeleting={isPendingDeleteFile}
										isInvalid={errosUpdateImage.image !== undefined}
										errorMessage={errosUpdateImage.image?.message}
										isDropable
										preview={typeof preview === "string" ? preview : ""}
									/>
								)}
							/>
							<Button disabled={isPendingDeleteFile || isPendingUploadFile || !preview} type="submit" fullWidth className="p-5 mt-4 text-white bg-default-700">
								{isPendingUpdateAccomodation ? (
									<Spinner size="sm" />
								): (
									"Save Changes"
								)}
							</Button>
						</div>
					</form>
				</CardBody>
		</Card>
	);
};

export default PhotosTab;
