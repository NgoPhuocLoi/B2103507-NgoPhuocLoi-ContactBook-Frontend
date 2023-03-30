import createApiClient from "./api.service";
class UserService {
  constructor(baseUrl = "/api/user") {
    this.api = createApiClient(baseUrl);
  }
  async register({ username, password }) {
    return await this.api.post("/register", {
      username,
      password,
    });
  }

  async login({ username, password }) {
    return await this.api.post("/login", {
      username,
      password,
    });
  }
}
export default UserService;
