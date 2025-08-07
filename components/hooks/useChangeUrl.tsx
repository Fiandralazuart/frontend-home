import { useRouter } from "next/router";
import React, { ChangeEvent } from "react";
import useDebounce from "./useDebounce";
import { DEFAULT_LIMIT, DEFAULT_PAGE, DEFAULT_SEARCH, DELAY } from "@/constant/list.constant";

const useChangeUrl = () => {
	const router = useRouter()
	const debounce = useDebounce()

	const currentLimit = router.query.limit
	const currentPage = router.query.page
	const currentSearch = router.query.search

	const setUrl = () => {
		router.replace({
			query: {
				limit: currentLimit || DEFAULT_LIMIT,
				page: currentPage || DEFAULT_PAGE,
				search: currentSearch || DEFAULT_SEARCH
			}
		})
	}

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		debounce(() => {
			const search = e.target.value
			router.push({
				query: {
					...router.query,
					search,
					page: DEFAULT_PAGE
				}
			})
		}, DELAY)
	}

	const handleClearSearch = () => {
		router.push({
			query: {
				...router.query,
				search: "",
				page: DEFAULT_PAGE
			}
		})
	}

	const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
		const limit = e.target.value
		router.push({
			query: {
				...router.query,
				limit,
				page: DEFAULT_PAGE
			}
		})
	}

	const handleChangePage = (page: number) => {
		router.push({
			query: {
				...router.query,
				page,
			}
		})
	}

	return {
		setUrl,
		currentLimit,
		currentPage, 
		currentSearch,

		handleSearch,
		handleClearSearch,
		handleChangeLimit,
		handleChangePage,
	};
};

export default useChangeUrl;
