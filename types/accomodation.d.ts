interface IBookedDate {
	start: string; // atau Date kalau mau langsung tipe Date
	end: string;
}

export interface IAccomodation {
	_id?: string;
	image?: string;
	name?: string;
	type?: string;
	price?: number;
	description?: string;
	facilities?: string[];
	isPublish?: boolean;
	slug?: string;
	bookedDates?: IBookedDate[];
	location?: {
		address: string;
      region: string;
      coordinates: number[]
   };
}
