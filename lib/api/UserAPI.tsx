import { UserData } from "../type/userType";
import { dataResponse, GetAPI, PostAPI, statusResponse } from "./fetchAPI";

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

  static passwordConfirm(password: string) {
    return PostAPI<statusResponse>("/user/changeinfo/identification", {
      password,
    });
  }

  static updateUserNickname(nickname: string) {
    return PostAPI<statusResponse>("/user/changeinfo/nickname", {
      nickname,
    });
  }

  static updateUserPassWordModify(
    newpassword: string,
    newPasswordCheck: string
  ) {
    return PostAPI<statusResponse>("/user/changeinfo/password", {
      newpassword,
      newPasswordCheck,
    });
  }
}

export default UserAPI;
