import Login from "@/components/view/auth/login"
import AuthLayout from "@/layouts/authLayout"


const LoginPage = () => {
	return (
		<AuthLayout title="Service | Login">
			<Login />
		</AuthLayout>
	)
}

export default LoginPage