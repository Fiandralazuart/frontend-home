import { defaultToaster, ToasterContext } from "@/context/ToasterContex";
import React, { ReactNode, useContext, useEffect } from "react";
import Toaster from "@/components/ui/Toaster";

interface PropTypes {
	children: ReactNode;
}

const AppShells = (props: PropTypes) => {
	const { children } = props;
	const { toaster, setToaster } = useContext(ToasterContext);

	useEffect(() => {
		const timeOut = setTimeout(() => {
			setToaster(defaultToaster);
		}, 3000);
		return () => {
			clearTimeout(timeOut);
		};
	}, [toaster]);

	return (
		<main>
			{children}
			{toaster.type !== "" && (
				<Toaster type={toaster.type} message={toaster.message} />
			)}
		</main>
	);
};

export default AppShells;
