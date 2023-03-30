import axios from "axios";

export default (baseURL, token = null) => {
  return axios.create({
    baseURL,

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
