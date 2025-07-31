

interface IRegister {
	fullname: string;
	username: string;
	email: string;
	password: string;
	confirmPassword: string
}

interface ILogin {
	identifier: string;
	password: string;
}

export { IRegister, ILogin }