

import React, { useEffect } from 'react';
import usePictureTab from './usePictureTab';
import { Controller } from 'react-hook-form';
import { IProfile } from '@/types/auth';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Avatar, Skeleton, Spinner } from '@heroui/react';
import InputFile from '@/components/ui/InputFIle';
import { Button } from '@heroui/button';

interface PropTypes {
	currentPicture: string;
	onUpdate: (data: IProfile) => void;
	isPendingUpdate: boolean;
	isSuccessUpdate: boolean;
}

const PictureTab = (props: PropTypes) => {
	const { currentPicture, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
	const {
		handleDeletePicture,
		handleUploadPicture,
		isPendingDeleteFile,
		isPendingUploadFile,

		controlUpdatePicture,
		handleSubmitUpdatePicture,
		errorsUpdatePicture,
		resetUpdatePicture,

		preview,
	} = usePictureTab();

	useEffect(() => {
		if (isSuccessUpdate) {
			resetUpdatePicture();
		}
	}, [isSuccessUpdate]);

	return (
		<Card className="w-full p-4 lg:w-1/3">
			<CardHeader className="flex flex-col items-center">
				<h1 className="w-full text-xl font-bold">Profile Picture</h1>
				<p className="w-full text-default-400">
					Manage picture for your profile
				</p>
			</CardHeader>
			<CardBody>
				<form
					className="flex flex-col gap-4"
					onSubmit={handleSubmitUpdatePicture(onUpdate)}
				>
					<div className="flex flex-col gap-2">
						<p className="text-sm font-medium text-default-700">
							Current Picture
						</p>
						<Skeleton
							isLoaded={!!currentPicture}
							className="w-2/3 mx-auto rounded-lg aspect-square"
						>
							<Avatar
								src={currentPicture}
								alt="Picture"
								showFallback
								className="w-full h-full aspect-square"
							/>
						</Skeleton>
					</div>
					<Controller
						name="profilePicture"
						control={controlUpdatePicture}
						render={({ field: { onChange, value, ...field } }) => (
							<InputFile
								{...field}
								onDelete={() => handleDeletePicture(onChange)}
								onUpload={(files) => handleUploadPicture(files, onChange)}
								isUploading={isPendingUploadFile}
								isDeleting={isPendingDeleteFile}
								isInvalid={errorsUpdatePicture.profilePicture !== undefined}
								errorMessage={errorsUpdatePicture.profilePicture?.message}
								isDropable
								label={
									<p className="mb-2 text-sm font-medium text-default-700">
										Upload New Picture
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

export default PictureTab;
