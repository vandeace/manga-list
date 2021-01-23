import axios from "axios";
import { GET_COLLECTION } from "components/_redux/store/types";

export const getCollection = (token) => {
  return {
    type: GET_COLLECTION,
    payload: axios({
      method: "GET",
      url: `https://mangaku-server.herokuapp.com/api/v1/mangas`,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }),
  };
};
