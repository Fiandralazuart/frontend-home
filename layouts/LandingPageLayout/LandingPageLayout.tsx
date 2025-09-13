import PageHead from "@/components/common/PageHead";
import { Fragment, ReactNode } from "react";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";
import LandingPageLayoutFooter from "./LandingPageLayoutFooter";

interface PropTypes {
	title: string;
	children: ReactNode
}

const LandingPageLayout = (props: PropTypes) => {
	const { title, children } = props

	return (
		<Fragment>
			<PageHead title={title} />
			<LandingPageLayoutNavbar />
			<div>
				{children}
			</div>

			<LandingPageLayoutFooter />
		</Fragment>
	);
};

export default LandingPageLayout;
