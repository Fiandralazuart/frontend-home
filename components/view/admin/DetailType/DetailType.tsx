import React from "react";
import useDetailType from "./useDetailType";
import { Tabs, Tab } from "@heroui/tabs";
import CoverTab from "./CoverTab";
import InfoTab from "./InfoType";

const DetailsType = () => {
	const {
		dataType,
		isPendingUpdateType,
		isSuccessUpdateType,
		handleUpdate,
	} = useDetailType();
	return (
		<Tabs>
			<Tab key="icon" title="Icon">
				<CoverTab
					currentIcon={dataType?.icon}
					onUpdate={handleUpdate}
					isPendingUpdate={isPendingUpdateType}
					isSuccessUpdate={isSuccessUpdateType}
				/>
			</Tab>
			<Tab key="info" title="Info">
				<InfoTab 
					dataType={dataType}
					onUpdate={handleUpdate}
					isPendingUpdate={isPendingUpdateType}
					isSuccessUpdate={isSuccessUpdateType}
				/>
			</Tab>
		</Tabs>
	);
};

export default DetailsType;
