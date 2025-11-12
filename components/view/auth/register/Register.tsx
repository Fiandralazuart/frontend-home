import Image from "next/image";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Controller } from "react-hook-form";
import useRegister from "./useRegister";
import { Input } from "@heroui/input";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import PasswordStrengthMeter from "@/components/common/PasswordChekker";
import { useState } from "react";

const Register = () => {
	const {
		control,
		errors,
		handleSubmit,
		handleRegister,
		isPendingMutateRegister,
		visible,
		handleVisible,
	} = useRegister();

	const [Password, setPassword] = useState("");

	const borderColor = {
		inputWrapper: "border-gray-300",
	};
	return (
		<div className="flex flex-col items-center justify-center gap-10 lg:gap-25 lg:flex-row">
			<div>
				<Image
					alt="logo"
					height={500}
					src="/images/general/Login-baru.png"
					width={500}
				/>
			</div>
			<div>
				<Card className="p-6 py-2 text-black bg-white">
					<CardHeader className="flex justify-center py-4">
						<h2 className="pt-2 text-2xl font-bold">Create Account</h2>
					</CardHeader>
					<CardBody className="flex flex-col items-center py-0 ">
						{errors.root && (
							<p className="mb-2 font-medium text-danger">
								{errors?.root?.message}
							</p>
						)}

						<form
							onSubmit={handleSubmit(handleRegister)}
							className={cn(
								"flex flex-col w-80 mt-4",
								Object.keys(errors).length > 0 ? "gap-2" : "gap-4"
							)}
						>
							<Controller
								control={control}
								name="fullname"
								render={({ field }) => (
									<Input
										size="sm"
										autoComplete="off"
										classNames={borderColor}
										errorMessage={errors.fullname?.message}
										label="Fullname"
										radius="lg"
										variant="bordered"
										{...field}
										isInvalid={errors.fullname !== undefined}
									/>
								)}
							/>
							<Controller
								control={control}
								name="username"
								render={({ field }) => (
									<Input
										size="sm"
										autoComplete="off"
										classNames={borderColor}
										errorMessage={errors.username?.message}
										label="Username"
										radius="lg"
										variant="bordered"
										{...field}
										isInvalid={errors.username !== undefined}
									/>
								)}
							/>
							<Controller
								control={control}
								name="email"
								render={({ field }) => (
									<Input
										size="sm"
										autoComplete="off"
										classNames={borderColor}
										errorMessage={errors.email?.message}
										label="Email"
										radius="lg"
										variant="bordered"
										{...field}
										isInvalid={errors.email !== undefined}
									/>
								)}
							/>
							<Controller
								control={control}
								name="password"
								render={({ field }) => (
									<Input
										size="sm"
										{...field}
										onChange={(e) => {
											setPassword(e.target.value);
											field.onChange(e);
										}}
										autoComplete="off"
										classNames={borderColor}
										errorMessage={errors.password?.message}
										label="Password"
										type={visible.password ? "text" : "password"}
										radius="lg"
										variant="bordered"
										isInvalid={errors.password !== undefined}
										endContent={
											<button
												className="my-auto"
												type="button"
												onClick={() => handleVisible("password")}
											>
												{visible.password ? (
													<FaEye className="text-xl pointer-events-none text-default-400" />
												) : (
													<FaEyeSlash className="text-xl pointer-events-none text-default-400" />
												)}
											</button>
										}
									/>
								)}
							/>
							<Controller
								control={control}
								name="confirmPassword"
								render={({ field }) => (
									<Input
										size="sm"
										autoComplete="off"
										classNames={borderColor}
										errorMessage={errors.confirmPassword?.message}
										label="Confirm Password"
										type={visible.confirmPassword ? "text" : "password"}
										radius="lg"
										variant="bordered"
										{...field}
										isInvalid={errors.confirmPassword !== undefined}
										endContent={
											<button
												className="my-auto"
												type="button"
												onClick={() => handleVisible("confirmPassword")}
											>
												{visible.confirmPassword ? (
													<FaEye className="text-xl pointer-events-none text-default-400" />
												) : (
													<FaEyeSlash className="text-xl pointer-events-none text-default-400" />
												)}
											</button>
										}
									/>
								)}
							/>

							<PasswordStrengthMeter password={Password} />

							<Button
								size="md"
								className="text-white bg-default-700"
								type="submit"
							>
								{isPendingMutateRegister ? <Spinner /> : "Register"}
							</Button>
						</form>
					</CardBody>
					<CardFooter className="flex justify-center">
						<p className="text-sm text-default-400">
							Already Have An Account? &nbsp;
							<Link className="font-semibold text-blue-500 " href="/auth/login">
								Log in
							</Link>
						</p>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default Register;
