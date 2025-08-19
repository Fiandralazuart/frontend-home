interface IBookedDate {
	start: string; // atau Date kalau mau langsung tipe Date
	end: string;
}

export interface IRegency {
	id: string;
	name: string;
}

export interface IAccomodation {
	_id?: string;
	image?: string | FileList;
	name?: string;
	type?: string;
	price?: string;
	description?: string;
	facilities?: string[];
	isPublish?: string;
	slug?: string;
	bookedDates?: IBookedDate[];
	location?: {
		address: string;
		region: string;
		link: string;
	};
}

export interface IAccomodationForm extends IAccomodation {
	address: string;
	region: string;
	link: string;
}
