import { API } from "config/api";
import { LOGIN } from "components/_redux/store/types";
import axios from "axios";

// export const Login = (payload = {}) => async (dispatch) => {
//   console.log("login");
//   const res = API.post("/login", payload);
//   if (res?.status === 200) {
//     dispatch(getCollection());
//   }
// };

export const Login = (payload) => {
  return {
    type: LOGIN,
    payload: axios({
      method: "POST",
      // url: `http://localhost:5000/api/v1/article`,
      url: `https://mangaku-server.herokuapp.com/api/v1/login`,
      data: payload,
    }),
  };
  // return {
  //   type: LOGIN,
  //   async payload() {
  //     try {
  //       API.post("/login", payload)
  //         .then((result) => {
  //           const token = result.data?.data.token;
  //           console.log(token, "token");
  //           localStorage.setItem("token", token);
  //           return result.data;
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //           return Promise.reject(error);
  //         });
  //       // const result = res.data;
  //       // console.log(result, "result");
  //       // return result;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  // };
};
