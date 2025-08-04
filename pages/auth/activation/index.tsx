import Activation from "@/components/view/auth/activation";
import AuthLayout from "@/layouts/authLayout";
import authServices from "@/services/auth.service";
import React from "react";

interface PropTypes {
	status: "success" | "failed";
}

const ActivationPage = (props: PropTypes) => {
	return (
		<AuthLayout title="Service | Activation">
			<Activation {...props} />
		</AuthLayout>
	);
};

export async function getServerSideProps(context: { query: { code: string } }) {
	try {
		const result = await authServices.activation({
			activationCode: context.query.code,
		});
		if (result.data.data) {
			return {
				props: {
					status: "success",
				},
			};
		} else {
			return {
				props: {
					status: "failed",
				},
			};
		}
	} catch (error) {
		return {
			props: {
				status: "failed",
			},
		};
	}
}

export default ActivationPage;
