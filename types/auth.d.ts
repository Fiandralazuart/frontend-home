import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
	fullname: string;
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface IPassword {
	oldPassword: string; 
	password: string;
	confirmPassword: string;
}

interface ILogin {
	identifier: string;
	password: string;
}

interface UserExtended extends User {
	accessToken?: string;
	role?: string;
}

interface JWTExtended extends JWT {
	user?: UserExtended;
}

interface SessionExtended extends Session {
	accessToken?: string;
}

interface IActivation {
	activationCode: string;
}

interface IProfile {
	_id?: string;
	email?: string;
	fullname?: string;
	isActive?: boolean;
	profilePicture?: string | FileList;
	role?: string;
	username?: string;
}

export {
	IRegister,
	ILogin,
	UserExtended,
	JWTExtended,
	SessionExtended,
	IActivation,
	IProfile,
	IPassword
};
