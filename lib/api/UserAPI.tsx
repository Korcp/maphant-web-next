import { UserData } from "../type/userType";
import { GetAPI, PostAPI, dataResponse, statusResponse } from "./fetchAPI";

type LoginResponse = {
	pubKey: string;
	privKey: string;
} & statusResponse;

class UserAPI {
	static login(email: string, password: string) {
		return PostAPI<LoginResponse>("/user/login", {
			email,
			password,
		});
	}
	static getMyProfile() {
		return GetAPI<dataResponse<UserData>>("/user/");
	}
}

export default UserAPI;
