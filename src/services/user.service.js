import createApiClient from "./api.service";
class UserService {
  constructor(baseUrl = "/api/user") {
    this.api = createApiClient(baseUrl);
  }
  async register({ username, password }) {
    return await this.api.post(this.baseUrl + "/register", {
      username,
      password,
    }).data;
  }

  async login({ username, password }) {
    return await this.api.post(this.baseUrl + "/login", {
      username,
      password,
    }).data;
  }
}
export default new UserService();
