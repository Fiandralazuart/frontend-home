import { Tab, Tabs } from "@heroui/tabs";
import React from "react";
import useDetailPhotos from "./useDetailPhotos";
import PhotosTab from "./PhotosTab";
import InfoTab from "./InfoTab";

const DetailPhotos = () => {
	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		reset,

		dataPhotos,
		refetchPhotos,

		handleUpdatePhotos,
		isPendingUpdatePhotos,
		isSuccessUpdatePhotos
	} = useDetailPhotos()

	return (
		<Tabs>
			<Tab title="Photos">
				<PhotosTab 
					currentImage={dataPhotos?.image}
					handleUpdate={handleUpdatePhotos}
					isPendingUpdateAccomodation={isPendingUpdatePhotos}
					isSuccessUpdateAccomodation={isSuccessUpdatePhotos}
				/>
			</Tab>
			<Tab title="Photos">
				<InfoTab 
					dataAccomodationPhotos={dataPhotos}
					handleUpdate={handleUpdatePhotos}
					isPendingUpdate={isPendingUpdatePhotos}
					isSuccessUpdate={isSuccessUpdatePhotos}
				/>
			</Tab>
		</Tabs>
	)
};

export default DetailPhotos;
