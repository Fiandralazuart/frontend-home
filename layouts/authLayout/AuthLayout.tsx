import { ReactNode } from "react";

import PageHead from "@/components/common/PageHead";

interface PropTypes {
	title: string;
	children: ReactNode
}

const AuthLayout = (props: PropTypes) => {
	const { title, children } = props

	return (
		<div className="flex flex-col items-center justify-center min-w-full min-h-screen">
			<PageHead title={title} />
			<section>
				{children}
			</section>
		</div>
	)
}

export default AuthLayout