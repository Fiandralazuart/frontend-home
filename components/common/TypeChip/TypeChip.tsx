import typeServices from "@/services/type.service";
import { Chip, Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

interface PropTypes {
	cellValue: string;
}

const TypeChip = ({ cellValue }: PropTypes) => {
	const { data: allTypes, isLoading } = useQuery({
		queryKey: ["types"], // tanpa cellValue, supaya cache digunakan ulang
		queryFn: async () => {
			const result = await typeServices.findAll();
			return result.data.data;
		},
		staleTime: 5 * 60 * 1000, // 5 menit cache
	});

	// Cari tipe yang sesuai dengan cellValue
	const typeObj = allTypes?.find((t: any) => t._id === cellValue);

	return (
		<Skeleton isLoaded={!isLoading}>
			<Chip size="md" variant="light">
				{typeObj?.name || "Unknown"}
			</Chip>
		</Skeleton>
	);
};

export default TypeChip;
