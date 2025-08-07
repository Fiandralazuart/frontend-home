import { Button } from "@heroui/button"
import Image from "next/image"
import Link from "next/link"


const RegisterSuccess = () => {
	return (
		<div className="flex flex-col items-center gap-3">
			<Image src="/images/general/success-new.png" alt="logo" width={450} height={450}/>
			<h1 className="text-xl font-bold text-black lg:text-3xl">Success Create Account</h1>
			<h3 className="text-md lg:text-xl text-default-400">Please Check Your Email For Activation</h3>

			<Button as={Link} href="/" className="text-sm text-white bg-default-700 lg:text-md">
				Back Home
			</Button>
		</div>
	)
}

export default RegisterSuccess