export const convertToDateStandart = (isoDate: Date) => {
	const date = new Date(isoDate);

	return date.toLocaleDateString("id-ID", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
};
