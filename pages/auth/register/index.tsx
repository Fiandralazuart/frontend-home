import Register from "@/components/view/auth/register"
import AuthLayout from "@/layouts/authLayout"

const RegisterPage = () => {
	return (
		<AuthLayout title="Service | Auth">
			<Register />
		</AuthLayout>
	)
}

export default RegisterPage