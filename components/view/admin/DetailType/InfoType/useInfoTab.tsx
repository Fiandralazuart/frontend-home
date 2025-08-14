import typeServices from '@/services/type.service'
import { IRoomType } from '@/types/type'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from "yup"

const Schema = yup.object().shape({
	name: yup.string().required("please insert name of type")
})

const useInfoTab = () => {
	const {
		control, 
		handleSubmit,
		setValue,
		reset,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(Schema)
	})

	return {
		control, 
		handleSubmit,
		setValue,
		reset,
		errors,
	}
}

export default useInfoTab