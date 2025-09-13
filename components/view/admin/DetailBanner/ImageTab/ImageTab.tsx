import Image from 'next/image';
import React, { useEffect } from 'react';
import useImageTab from './useImageTab';
import { Controller } from 'react-hook-form';
import { IBanner } from '@/types/banner';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Skeleton, Spinner } from '@heroui/react';
import InputFile from '@/components/ui/InputFIle';
import { Button } from '@heroui/button';

interface PropTypes {
	currentImage: string;
	onUpdate: (data: IBanner) => void;
	isPendingUpdate: boolean;
	isSuccessUpdate: boolean;
}

const ImageTab = (props: PropTypes) => {
	const { currentImage, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
	const {
		handleDeleteImage,
		handleUploadImage,
		isPendingDeleteFile,
		isPendingUploadFile,

		controlUpdateImage,
		handleSubmitUpdateImage,
		errorsUpdateImage,
		resetUpdateImage,

		preview,
	} = useImageTab();


	useEffect(() => {
		if (isSuccessUpdate) {
			resetUpdateImage();
		}
	}, [isSuccessUpdate]);

	return (
		<Card className="w-full p-4 lg:w-1/2">
			<CardHeader className="flex flex-col items-center">
				<h1 className="w-full text-xl font-bold">Banner Image</h1>
				<p className="w-full text-default-400">Manage Image for this banner</p>
			</CardHeader>
			<CardBody>
				<form
					className="flex flex-col gap-4"
					onSubmit={handleSubmitUpdateImage(onUpdate)}
				>
					<div className="flex flex-col gap-2">
						<p className="text-sm font-medium text-default-700">Current Banner</p>
						<Skeleton
							isLoaded={!!currentImage}
							className="rounded-lg aspect-video"
						>
							<Image src={currentImage} alt="Banner" fill className="!relative object-cover m-auto rounded-lg aspect-video w-36" />
						</Skeleton>
					</div>
					<Controller
						name="banner"
						control={controlUpdateImage}
						render={({ field: { onChange, value, ...field } }) => (
							<InputFile
								{...field}
								onDelete={() => handleDeleteImage(onChange)}
								onUpload={(files) => handleUploadImage(files, onChange)}
								isUploading={isPendingUploadFile}
								isInvalid={errorsUpdateImage.banner !== undefined}
								errorMessage={errorsUpdateImage.banner?.message}
								isDropable
								label={
									<p className="mb-2 text-sm font-medium text-default-700">
										Upload New Banner
									</p>
								}
								preview={typeof preview === 'string' ? preview : ''}
							/>
						)}
					/>
					<Button
						type="submit"
						className="mt-2 text-white bg-default-700 disabled:bg-default-500"
						disabled={isPendingUploadFile || isPendingUpdate || !preview}
					>
						{isPendingUpdate ? (
							<Spinner size="sm" color="white" />
						) : (
							'Save Change'
						)}
					</Button>
				</form>
			</CardBody>
		</Card>
	);
};

export default ImageTab;
