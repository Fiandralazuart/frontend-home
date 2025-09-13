import { IBanner } from '@/types/banner';
import React, { useEffect } from 'react';
import useInfoTab from './useInfoTab';
import { Controller } from 'react-hook-form';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Input, Select, SelectItem, Skeleton, Spinner } from '@heroui/react';
import { Button } from '@heroui/button';

interface PropTypes {
	dataBanner: IBanner;
	onUpdate: (data: IBanner) => void;
	isPendingUpdate: boolean;
	isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
	const { dataBanner, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
	const {
		controlUpdateInfo,
      errorsUpdateInfo,
      handleSubmitUpdateInfo,
      resetUpdateInfo,
      SetValuesUpdateInfo
	} = useInfoTab()

	useEffect(() => {
		SetValuesUpdateInfo("title", `${dataBanner?.title}`)
		SetValuesUpdateInfo("isShow", `${dataBanner?.isShow}`)
	},[dataBanner, isSuccessUpdate])

	useEffect(() => {
		if(isSuccessUpdate) {
			resetUpdateInfo()
		}
	}, [isSuccessUpdate])

	return (
		<Card className="w-full p-4 lg:w-1/2">
			<CardHeader className="flex flex-col items-center">
				<h1 className="w-full text-xl font-bold">Banner Information</h1>
				<p className="w-full text-default-400">
					Manage Information for this Banner
				</p>
			</CardHeader>
			<CardBody>
				<form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateInfo(onUpdate)}>
					<Skeleton isLoaded={!!dataBanner?.title} className="rounded-lg">
						<Controller 
                        name="title"
                        control={controlUpdateInfo}
                        render={({field}) => (
                           <Input 
                              {...field} 
                              label="Title" 
                              variant="bordered" 
										labelPlacement='outside'
                              type="text"
                              isInvalid={errorsUpdateInfo.title !== undefined}
                              errorMessage={errorsUpdateInfo.title?.message}
                              className="mb-2"
                           />
                        )} 
                     />
					</Skeleton>
					<Skeleton
						isLoaded={!!dataBanner}
						className="rounded-lg"
					>
						<Controller
							name="isShow"
							control={controlUpdateInfo}
							render={({ field }) => (
								<Select
									{...field}
									label="Status"
									variant="bordered"
									labelPlacement='outside'
									isInvalid={errorsUpdateInfo.isShow !== undefined}
									errorMessage={errorsUpdateInfo.isShow?.message}
									disallowEmptySelection
									defaultSelectedKeys={[dataBanner?.isShow ? "true" : "false"]}
								>
									<SelectItem key="true">
										Show
									</SelectItem>
									<SelectItem key="false">
										Hide
									</SelectItem>
								</Select>
							)}
						/>
					</Skeleton>
					<Button
						type="submit"
						className="mt-2 text-white bg-default-700 disabled:bg-default-500"
						disabled={isPendingUpdate || !dataBanner?._id}
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

export default InfoTab;
