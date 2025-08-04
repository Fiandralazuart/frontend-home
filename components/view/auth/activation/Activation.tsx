import { Button } from "@heroui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PropTypes {
	status: "success" | "failed";
}

const Activation = (props: PropTypes) => {
	const { status } = props;
	// const status = "failed"

	return (
		<div>
			{status === "success" ? (
				<div className="flex flex-col items-center justify-center gap-2 text-black">
					<Image
						src="/images/general/activationSuccess-new.png"
						alt="logo"
						width={500}
						height={500}
					/>

					<h1 className="text-2xl font-bold">Activation {status === "success" &&  "Success" }</h1>
					<p className="text-xl font-semibold text-default-300"> Thankyou for register account in FixInAja</p>

					<Button as={Link} href="/" className="mt-5"> 
						Back Home
					</Button>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center gap-2 text-black">
					<Image
						src="/images/general/activationFailed-new.png"
						alt="logo"
						width={500}
						height={500}
					/>

					<h1 className="text-2xl font-bold">Activation {status === "failed" && "Failed"}</h1>
					<p className="text-xl font-semibold text-default-300">Thankyou for register account in FixInAja</p>

					<Button as={Link} href="/" className="mt-5"> 
						Back Home
					</Button>
				</div>
			)}
		</div>
	);
};

export default Activation;
