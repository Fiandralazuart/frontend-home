
import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import useInfoTab from './useInfoTab';
import { IProfile } from '@/types/auth';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Input, Skeleton, Spinner } from '@heroui/react';
import { Button } from '@heroui/button';

interface PropTypes {
	dataProfile: IProfile;
	onUpdate: (data: IProfile) => void;
	isPendingUpdate: boolean;
	isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
	const {
		dataProfile,
		onUpdate,
		isPendingUpdate,
		isSuccessUpdate,
	} = props;
	const {
		controlUpdateInfo,
		errorsUpdateInfo,
		handleSubmitUpdateInfo,
		resetUpdateInfo,
		SetValuesUpdateInfo,
	} = useInfoTab();

	useEffect(() => {
		if (dataProfile) {
			SetValuesUpdateInfo('fullname', `${dataProfile?.fullname}`);
		}
	}, [dataProfile]);

	useEffect(() => {
		if (isSuccessUpdate) {
			resetUpdateInfo();
		}
	}, [isSuccessUpdate]);

	return (
		<Card className="w-full p-4 lg:w-1/2">
			<CardHeader className="flex flex-col items-center">
				<h1 className="w-full text-xl font-bold">User Information</h1>
				<p className="w-full text-default-400">
					Manage Information of this account
				</p>
			</CardHeader>
			<CardBody>
				<form
					className="flex flex-col gap-4"
					onSubmit={handleSubmitUpdateInfo(onUpdate)}
				>
					<Skeleton
						isLoaded={!!dataProfile?.username}
						className="rounded-lg"
					>
						<Input
							label="Username"
							variant="flat"
							labelPlacement="outside"
							disabled
							value={dataProfile?.username}
						/>
					</Skeleton>
					<Skeleton
						isLoaded={!!dataProfile?.email}
						className="rounded-lg"
					>
						<Input
							label="Email"
							variant="flat"
							labelPlacement="outside"
							disabled
							value={dataProfile?.email}
						/>
					</Skeleton>
					<Skeleton
						isLoaded={!!dataProfile?.role}
						className="rounded-lg"
					>
						<Input
							label="Role"
							variant="flat"
							labelPlacement="outside"
							disabled
							value={dataProfile?.role}
						/>
					</Skeleton>
					<Skeleton
						isLoaded={!!dataProfile?.role}
						className="rounded-lg"
					>
						<Controller
							name="fullname"
							control={controlUpdateInfo}
							render={({ field }) => (
								<Input
									{...field}
									label="Fullname"
									variant="bordered"
									labelPlacement="outside"
									placeholder='input your fullname'
									isInvalid={errorsUpdateInfo.fullname !== undefined}
									errorMessage={errorsUpdateInfo.fullname?.message}
								/>
							)}
						/>
					</Skeleton>


					<Button
						type="submit"
						className="mt-2 text-white bg-default-700 isabled:bg-default-500"
						isDisabled={isPendingUpdate || !dataProfile?._id}
					>
						{isPendingUpdate ? (
							<Spinner size="sm" color="white" />
						) : (
							'Save Changes'
						)}
					</Button>
				</form>
			</CardBody>
		</Card>
	);
};

export default InfoTab;
