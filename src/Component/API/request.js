import axios from "axios";
import Cookies from "js-cookie";

// export const base_url = "https://5975-42-118-50-145.ngrok-free.app/"

const base_url = "http://localhost:8088/";
const login_path = "api/auth/login";


axios.interceptors.request.use((req) => {
  const jwt = Cookies.get("jwt");
  const newUrl = base_url + req.url;
  const Authorization = (req.url === login_path ) ? undefined : `Bearer ${jwt}`;
  // const Authorization = undefined;
  return {
    ...req,
    url: newUrl,
    headers: {
      ...req.headers,
      Authorization,
      "ngrok-skip-browser-warning": "1",
    },
  };
});

// console.log(Cookies.ge);

// Sau khi có response trả về
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);
const qrId = new URLSearchParams(window.location.search).get("id");
if (qrId) {
  Cookies.set("qrId", qrId);
}
export default axios;
