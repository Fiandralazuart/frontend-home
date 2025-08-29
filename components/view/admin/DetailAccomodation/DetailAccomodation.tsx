import { Tab, Tabs } from "@heroui/tabs";
import React from "react";
import useDetailAccomodation from "./useDetailAccomodation";
import ImageTab from "./ImageTab/ImageTab";
import InfoTab from "./InfoTab";
import LocationTab from "./LocationTab";
import PhotosTab from "./PhotosTab";

const DetailAccomodation = () => {
	const {
		dataAccomodation,
		handleUpdateAccomodation,
		isPendingUpdateAcconmodation,
		isSuccessUpdateAccomodation,
		dataDefaultRegion,
		handleUpdateLocation
	} = useDetailAccomodation();

	return (
		<Tabs>
			<Tab title="Image">
				<ImageTab
					currentImage={dataAccomodation?.image}
					handleUpdate={handleUpdateAccomodation}
					isPendingUpdateAccomodation={isPendingUpdateAcconmodation}
					isSuccessUpdateAccomodation={isSuccessUpdateAccomodation}
				/>
			</Tab>
			<Tab title="Info">
				<InfoTab 
					dataAccomodation={dataAccomodation}
					handleUpdate={handleUpdateAccomodation}
					isPendingUpdate={isPendingUpdateAcconmodation}
					isSuccessUpdate={isSuccessUpdateAccomodation}
				/>
			</Tab>
			<Tab title="Location">
				<LocationTab
					dataAccomodation={dataAccomodation}
					handleUpdate={handleUpdateLocation}
					isPendingUpdate={isPendingUpdateAcconmodation}
					isSuccessUpdate={isSuccessUpdateAccomodation}
					defaultInputRegion={dataDefaultRegion?.data?.data[0]?.name}
				/>
			</Tab>
			<Tab title="Photos">
				<PhotosTab />
			</Tab>
		</Tabs>
	);
};

export default DetailAccomodation;
