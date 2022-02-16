import axios from "axios";

export const URL = "https://bahar.appssquare.com";

const instance = axios.create({
  baseURL: `${URL}/api/admin/`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("bt")}`,
  },
});

instance.interceptors.request.use((req) => {
  // req?.data.append('_method','put')

  //req.params['_method']='put'

  // Important: request interceptors **must** return the request.
  return req;
});
instance.interceptors.response.use(
  (res) => {
    window.localStorage.setItem("countA", res.headers["joining-requests"]);
    window.localStorage.setItem("countB", res.headers.modification);

    return res;
  },

  (err) => {
    if (
      err &&
      err.response &&
      err.response.status == 403 &&
      err.response.config.url != "provider/login"
    ) {
      window.localStorage.removeItem("bt");
      window.location.replace("/");
    } else if (
      err.response.status == 401 &&
      err.response.config.url != "provider/login"
    ) {
      window.localStorage.removeItem("bt");

      window.location.replace("/");
    }

    // Important: response interceptors **must** return the response.
    // return err;
    else return Promise.reject(err);
  }
);

export default instance;
