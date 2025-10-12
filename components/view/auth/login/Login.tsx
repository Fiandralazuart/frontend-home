import Image from "next/image";
import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Controller } from "react-hook-form";
import { Input } from "@heroui/input";
import useLogin from "./useLogin";
import { button } from "@heroui/theme";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";
import { cn } from "@/utils/cn";
import Link from "next/link";

const Login = () => {
	const {
		control,
		handleSubmit,
		errors,
		isPendingMutateLogin,
		handleLogin,
		visible,
		toogleVisible,
	} = useLogin();

	const borderColor = {
		inputWrapper: "border-gray-300",
	};

	return (
		<div className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
			<Image
				src="/images/general/Login-baru.png"
				alt="logo"
				width={500}
				height={300}
			/>

			<Card className="flex flex-col p-4 text-black bg-white">
				<CardHeader className="flex justify-center text-2xl font-bold">
					<h1>Sign In</h1>
				</CardHeader>
				<CardBody className="flex flex-col items-center">
					<form
						onSubmit={handleSubmit(handleLogin)}
						className={cn(
							"flex flex-col w-80 mt-4",
							Object.keys(errors).length > 0 ? "gap-2" : "gap-4"
						)}
					>
						<Controller
							control={control}
							name="identifier"
							render={({ field }) => (
								<Input
									{...field}
									label="Username or Email"
									variant="bordered"
									classNames={borderColor}
									autoComplete="off"
									errorMessage={errors.identifier?.message}
									isInvalid={errors.identifier !== undefined}
								/>
							)}
						/>
						<Controller
							control={control}
							name="password"
							render={({ field }) => (
								<Input
									{...field}
									label="Password"
									classNames={borderColor}
									type={visible ? "text" : "password"}
									variant="bordered"
									autoComplete="off"
									errorMessage={errors.password?.message}
									isInvalid={errors.password !== undefined}
									endContent={
										<button type="button" onClick={() => toogleVisible()}>
											{visible ? <FaEye /> : <FaEyeSlash />}
										</button>
									}
								/>
							)}
						/>

						<Button className="text-white bg-default-700" type="submit">
							{isPendingMutateLogin ? <Spinner size="sm"/> : "Sign In"}
						</Button>
					</form>
				</CardBody>
				<CardFooter className="flex justify-center">
					<p className="text-sm text-default-400">
						Do not have any account?&nbsp;{" "}
						<Link href="/auth/register" className="font-semibold text-blue-500">Sign Up</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Login;
