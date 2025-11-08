import React from 'react';
import PictureTab from './Picture';
import useDetailProfile from './useProfile';
import InfoTab from './InfoTab';
import { Tab, Tabs } from '@heroui/tabs';
import SecurityTab from './SecurityTab/SecurityTab';

const Profile = () => {
	const {
		dataProfile,
		handleUpdateProfile,
		isPendingMutateUpdateProfile,
		isSuccessMutateUpdateProfile,
	} = useDetailProfile();
	return (
		<Tabs aria-label="Options">
			<Tab key="picture" title="Picture">
				<PictureTab
					currentPicture={dataProfile?.profilePicture}
					onUpdate={handleUpdateProfile}
					isPendingUpdate={isPendingMutateUpdateProfile}
					isSuccessUpdate={isSuccessMutateUpdateProfile}
				/>
			</Tab>
			<Tab key="info" title="Info">
				<InfoTab
					dataProfile={dataProfile}
					onUpdate={handleUpdateProfile}
					isPendingUpdate={isPendingMutateUpdateProfile}
					isSuccessUpdate={isSuccessMutateUpdateProfile}
				/>
			</Tab>
			<Tab key="security" title="Security">
				<SecurityTab />
			</Tab>
		</Tabs>
	);
};

export default Profile;
